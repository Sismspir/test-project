import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/EmployeeList.scss';
import { useEmployeeFilters } from '../hooks/useEmployeeFiltersRedux';
import { useAppDispatch } from '../redux/hooks';
import { fetchEmployees } from '../redux/slices/employeesSlice';
import { Loader } from './Loader';
import { Error } from './Error';
import { EmployeeFilters } from './EmployeeFilters';

const EmployeeList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    employees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    departments,
    filteredEmployees,
    totalResults,
    totalEmployees,
    hasActiveFilters,
    filterSummary,
  } = useEmployeeFilters();

  useEffect(() => {
    if (employees.length === 0 && !loading) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length, loading]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
        <Error error={new Error(error)}/>
    );
  }

  return (
    <div>
      <EmployeeFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        departments={departments}
      />

      <Box sx={{ mb: 2, px: 1 }}>
        <Typography variant="body2" color="text.primary">
          Showing {totalResults} of {totalEmployees} employees
          {hasActiveFilters && filterSummary && (
            <span style={{ fontWeight: 500 }}>
              {' '}• Filtered by: {filterSummary}
            </span>
          )}
        </Typography>
      </Box>

      <TableContainer component={Paper} className="employee-table-container">
        <Table className="employee-table">
          <TableHead className="sticky-header">
            <TableRow className="employee-table-header">
              <TableCell className="employee-table-cell" align="center">Full Name</TableCell>
              <TableCell className="employee-table-cell" align="center">Department</TableCell>
              <TableCell className="employee-table-cell" align="center">Email</TableCell>
              <TableCell className="employee-table-cell" align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <Typography variant="h6" color="text.secondary">
                    No employees found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hasActiveFilters
                      ? 'Try adjusting your search or filter criteria'
                      : 'No employees available'
                    }
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee, index) => (
                <TableRow
                  key={index}
                  className="employee-table-row"
                  onClick={() => navigate(`/employee/${employee.id}`)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <TableCell className="employee-table-cell" align="center">{employee.fullName}</TableCell>
                  <TableCell className="employee-table-cell" align="center">{employee.department}</TableCell>
                  <TableCell className="employee-table-cell" align="center">{employee.email}</TableCell>
                  <TableCell className={`employee-table-cell ${employee.status === 'Active' ? 'status-active' : 'status-inactive'}`} align="center">
                    {employee.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;