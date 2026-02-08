import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../services/fetchEmployeesService';

export const useGetEmployees = () =>
    useQuery({
        queryKey: ['employees'],
        queryFn: fetchEmployees,
    });