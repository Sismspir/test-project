import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string;
  selectedDepartment: string;
}

const initialState: FiltersState = {
  searchTerm: localStorage.getItem("searchTerm") || '',
  selectedDepartment: localStorage.getItem("selectedDepartment") || '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      localStorage.setItem("searchTerm", action.payload);
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload;
      localStorage.setItem("selectedDepartment", action.payload);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      localStorage.setItem("searchTerm", '')
      state.selectedDepartment = '';
      localStorage.setItem("selectedDepartment", '');
    },
  },
});

export const { setSearchTerm, setSelectedDepartment, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;