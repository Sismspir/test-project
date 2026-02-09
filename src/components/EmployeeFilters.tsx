import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { EmployeeFiltersProps } from '../types/employee';

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        p: 3,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <TextField
        label="Search by name or email"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 300, flexGrow: 1 }}
        placeholder="Type to search employees..."
        size="small"
      />

      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Filter by Department</InputLabel>
        <Select
          value={selectedDepartment}
          label="Filter by Department"
          onChange={(e) => onDepartmentChange(e.target.value)}
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};