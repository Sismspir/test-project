import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSearchTerm, setSelectedDepartment } from '../redux/slices/filtersSlice';
import { useGetEmployees } from './useGetEmployees';
import type { Employee } from '../types/employee';

export const useEmployeeFiltersWithReactQuery = () => {
  const dispatch = useAppDispatch();
  const { data: employees, isLoading: loading, error } = useGetEmployees();
  const { searchTerm, selectedDepartment } = useAppSelector((state) => state.filters);
  
  // Departments are calculated only when employees change
  const departments = useMemo(() => {
    if (!employees) return [];
    const uniqueDepartments = [...new Set(employees.map((emp: Employee) => emp.department))];
    uniqueDepartments.push("All")
    return uniqueDepartments.sort();
  }, [employees]);

  // Rerender only when the search term, selected department, or employee data changes
  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee: Employee) => {
      const matchesSearch = searchTerm === '' ||
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = selectedDepartment === '' || selectedDepartment === "All" ||
        employee.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, selectedDepartment]);

  const totalResults = filteredEmployees.length;
  const totalEmployees = employees?.length || 0;
  const hasActiveFilters = searchTerm !== '' || selectedDepartment !== '';
  const filterSummary = hasActiveFilters
    ? [
        searchTerm && `search: "${searchTerm}"`,
        selectedDepartment && `department: ${selectedDepartment}`
      ].filter(Boolean).join(', ')
    : '';

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleDepartmentChange = (value: string) => {
    dispatch(setSelectedDepartment(value));
  };

  return {
    employees: employees || [],
    loading,
    error,
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedDepartment,
    setSelectedDepartment: handleDepartmentChange,
    departments,
    filteredEmployees,
    totalResults,
    totalEmployees,
    hasActiveFilters,
    filterSummary,
  };
};