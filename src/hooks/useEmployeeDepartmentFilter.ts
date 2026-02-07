import { useState, useMemo } from 'react';
import type { Employee } from '../types/employee';

export const useEmployeeDepartmentFilter = (employees: Employee[]) => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredEmployees = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === 'All' || !employees.length) {
      return employees;
    }
    return employees.filter(employee => employee.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  const departments = useMemo(() => {
    if (!employees.length) return ['All'];
    const uniqueDepartments = Array.from(new Set(employees.map(emp => emp.department)));
    return ['All', ...uniqueDepartments];
  }, [employees]);

  return {
    selectedDepartment,
    setSelectedDepartment,
    filteredEmployees,
    departments,
  };
};