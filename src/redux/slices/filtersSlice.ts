import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string;
  selectedDepartment: string;
}

const initialState: FiltersState = {
  searchTerm: '',
  selectedDepartment: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedDepartment = '';
    },
  },
});

export const { setSearchTerm, setSelectedDepartment, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;