import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSearchTerm, setSelectedDepartment } from '../redux/slices/filtersSlice';
import type { Employee } from '../types/employee';

export const useEmployeeFilters = () => {
  const dispatch = useAppDispatch();
  const { employees, loading, error } = useAppSelector((state) => state.employees);
  const { searchTerm, selectedDepartment } = useAppSelector((state) => state.filters);

  const departments = useMemo(() => {
    if (!employees) return [];
    const uniqueDepartments = [...new Set(employees.map((emp: Employee) => emp.department))];
    return uniqueDepartments.sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee: Employee) => {
      const matchesSearch = searchTerm === '' ||
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = selectedDepartment === '' ||
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
    employees,
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