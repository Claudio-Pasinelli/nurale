import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomers } from '../actions/fetchCustomers';
import { initialStateCustomers } from '../types';

const initialState: initialStateCustomers = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const customersReduxer = createSlice({
  name: 'customers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.totalCount = action.payload.pagination.totalCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching customers';
      });
  },
});
