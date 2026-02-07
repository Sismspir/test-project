import type { Employee } from '../types/employee'
  
export const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await fetch('https://698732938bacd1d773ecc645.mockapi.io/api/v0/employees');
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();
};