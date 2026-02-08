import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string;
  selectedDepartment: string;
}

// Helper function to safely access localStorage
const getFromStorage = (key: string): string => {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) || '' : '';
  } catch {
    return '';
  }
};

// Helper function to safely set localStorage
const setToStorage = (key: string, value: string): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // Ignore errors in test environments or when localStorage is not available
  }
};

const initialState: FiltersState = {
  searchTerm: getFromStorage("searchTerm"),
  selectedDepartment: getFromStorage("selectedDepartment"),
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      setToStorage("searchTerm", action.payload);
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload;
      setToStorage("selectedDepartment", action.payload);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      setToStorage("searchTerm", '')
      state.selectedDepartment = '';
      setToStorage("selectedDepartment", '');
    },
  },
});

export const { setSearchTerm, setSelectedDepartment, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;