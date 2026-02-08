import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../redux/slices/filtersSlice';
import EmployeeList from '../components/EmployeeList';
import type { Employee } from '../types/employee';

// Mock the useGetEmployees hook
vi.mock('../hooks/useGetEmployees', () => ({
  useGetEmployees: vi.fn(),
}));

// Mock the useEmployeeFiltersWithReactQuery hook
vi.mock('../hooks/useEmployeeFiltersWithReactQuery', () => ({
  useEmployeeFiltersWithReactQuery: vi.fn(),
}));

// Import the mocked hooks
import { useEmployeeFiltersWithReactQuery } from '../hooks/useEmployeeFiltersWithReactQuery';

const mockUseEmployeeFiltersWithReactQuery = vi.mocked(useEmployeeFiltersWithReactQuery);

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Test data
const mockEmployees: Employee[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    department: 'Engineering',
    hireDate: '2023-01-15',
    notes: 'Great employee',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Active',
    department: 'Marketing',
    hireDate: '2023-02-20',
    notes: 'Excellent performance',
  },
];

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      filters: filtersReducer,
    },
  });
};

// Helper function to render component with providers
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const store = createTestStore();

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

describe('EmployeeList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock loading state
    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: [],
      loading: true,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      selectedDepartment: '',
      setSelectedDepartment: vi.fn(),
      departments: [],
      filteredEmployees: [],
      totalResults: 0,
      totalEmployees: 0,
      hasActiveFilters: false,
      filterSummary: '',
    });

    renderWithProviders(<EmployeeList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    const errorMessage = 'Failed to fetch employees';
    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: [],
      loading: false,
      error: new Error(errorMessage),
      searchTerm: '',
      setSearchTerm: vi.fn(),
      selectedDepartment: '',
      setSelectedDepartment: vi.fn(),
      departments: [],
      filteredEmployees: [],
      totalResults: 0,
      totalEmployees: 0,
      hasActiveFilters: false,
      filterSummary: '',
    });

    renderWithProviders(<EmployeeList />);

    expect(screen.getByText('Error Loading Data')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders employee table with data', () => {
    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: mockEmployees,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      selectedDepartment: '',
      setSelectedDepartment: vi.fn(),
      departments: ['All', 'Engineering', 'Marketing'],
      filteredEmployees: mockEmployees,
      totalResults: 2,
      totalEmployees: 2,
      hasActiveFilters: false,
      filterSummary: '',
    });

    renderWithProviders(<EmployeeList />);

    // Check table headers
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check employee data - be more specific to avoid duplicates
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();

    // Check that Active status appears (both employees are active)
    const activeStatuses = screen.getAllByText('Active');
    expect(activeStatuses).toHaveLength(2);
  });

  it('displays correct result count', () => {
    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: mockEmployees,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      selectedDepartment: '',
      setSelectedDepartment: vi.fn(),
      departments: ['All', 'Engineering', 'Marketing'],
      filteredEmployees: mockEmployees,
      totalResults: 2,
      totalEmployees: 2,
      hasActiveFilters: false,
      filterSummary: '',
    });

    renderWithProviders(<EmployeeList />);

    expect(screen.getByText('Showing 2 of 2 employees')).toBeInTheDocument();
  });

  it('navigates to employee details on row click', async () => {
    const user = userEvent.setup();

    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: mockEmployees,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
      selectedDepartment: '',
      setSelectedDepartment: vi.fn(),
      departments: ['All', 'Engineering', 'Marketing'],
      filteredEmployees: mockEmployees,
      totalResults: 2,
      totalEmployees: 2,
      hasActiveFilters: false,
      filterSummary: '',
    });

    renderWithProviders(<EmployeeList />);

    // Find the first employee row and click it
    const firstEmployeeRow = screen.getByText('John Doe').closest('tr');
    if (firstEmployeeRow) {
      await user.click(firstEmployeeRow);
      expect(mockNavigate).toHaveBeenCalledWith('/employee/1');
    }
  });

  it('shows "No employees found" when filtered results are empty', () => {
    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: mockEmployees,
      loading: false,
      error: null,
      searchTerm: 'nonexistent',
      setSearchTerm: vi.fn(),
      selectedDepartment: '',
      setSelectedDepartment: vi.fn(),
      departments: ['All', 'Engineering', 'Marketing'],
      filteredEmployees: [],
      totalResults: 0,
      totalEmployees: 2,
      hasActiveFilters: true,
      filterSummary: 'search: "nonexistent"',
    });

    renderWithProviders(<EmployeeList />);

    expect(screen.getByText('No employees found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filter criteria')).toBeInTheDocument();
  });

  it('renders EmployeeFilters component', () => {
    const mockSetSearchTerm = vi.fn();
    const mockSetSelectedDepartment = vi.fn();

    mockUseEmployeeFiltersWithReactQuery.mockReturnValue({
      employees: mockEmployees,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      selectedDepartment: '',
      setSelectedDepartment: mockSetSelectedDepartment,
      departments: ['All', 'Engineering', 'Marketing'],
      filteredEmployees: mockEmployees,
      totalResults: 2,
      totalEmployees: 2,
      hasActiveFilters: false,
      filterSummary: '',
    });

    renderWithProviders(<EmployeeList />);

    // The EmployeeFilters component should be rendered
    // We can check for input fields that would be in the filters
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });
});