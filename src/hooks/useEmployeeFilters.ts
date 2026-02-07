import { useMemo } from 'react';
import type { Employee } from '../types/employee';
import { useEmployeeSearch } from './useEmployeeSearch';
import { useEmployeeDepartmentFilter } from './useEmployeeDepartmentFilter';

export const useEmployeeFilters = (employees: Employee[]) => {
  // First apply search filter
  const searchHook = useEmployeeSearch(employees);
  const searchFilteredEmployees = searchHook.filteredEmployees;

  // Then apply department filter on the search results
  const departmentHook = useEmployeeDepartmentFilter(searchFilteredEmployees);

  // Calculate total results and filter summary
  const totalResults = departmentHook.filteredEmployees.length;
  const totalEmployees = employees.length;
  const hasActiveFilters = searchHook.searchTerm.trim() || departmentHook.selectedDepartment !== 'All';

  const filterSummary = useMemo(() => {
    if (!hasActiveFilters) return null;

    const parts = [];
    if (searchHook.searchTerm.trim()) {
      parts.push(`search: "${searchHook.searchTerm}"`);
    }
    if (departmentHook.selectedDepartment !== 'All') {
      parts.push(`department: "${departmentHook.selectedDepartment}"`);
    }
    return parts.join(', ');
  }, [hasActiveFilters, searchHook.searchTerm, departmentHook.selectedDepartment]);

  return {
    // Search functionality
    searchTerm: searchHook.searchTerm,
    setSearchTerm: searchHook.setSearchTerm,

    // Department filter functionality
    selectedDepartment: departmentHook.selectedDepartment,
    setSelectedDepartment: departmentHook.setSelectedDepartment,
    departments: departmentHook.departments,

    // Results
    filteredEmployees: departmentHook.filteredEmployees,
    totalResults,
    totalEmployees,
    hasActiveFilters,
    filterSummary,
  };
};