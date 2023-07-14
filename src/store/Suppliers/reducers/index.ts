import { createSlice } from '@reduxjs/toolkit';
import { fetchSuppliers } from '../actions/fetchSuppliers';
import { initialStateSuppliers } from '../types';

const initialState: initialStateSuppliers = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const suppliersReduxer = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.totalCount = action.payload.pagination.totalCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching suppliers';
      });
  },
});
