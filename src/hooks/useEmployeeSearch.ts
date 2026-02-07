import { useState, useMemo } from 'react';
import type { Employee } from '../types/employee';

export const useEmployeeSearch = (employees: Employee[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim() || !employees.length) return employees;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return employees.filter(employee =>
      employee.fullName.toLowerCase().includes(lowerSearchTerm) ||
      employee.email.toLowerCase().includes(lowerSearchTerm)
    );
  }, [employees, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredEmployees,
  };
};