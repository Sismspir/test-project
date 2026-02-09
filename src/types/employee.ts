export interface Employee {
  id: string;
  fullName: string;
  email: string;
  status: string;
  department: string;
  hireDate: string;
  notes: string;
}

export interface EmployeeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  departments: string[];
}

export interface ErrorProps {
  error: Error | null;
  onRetry?: () => void;
}

export interface LoaderProps {
  message?: string;
}