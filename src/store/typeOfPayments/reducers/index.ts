import { createSlice } from '@reduxjs/toolkit';
import { fetchTypeOfPayments } from '../actions/fetchTypeOfPayments';
import { initialStateTypeOfPayments } from '../types';

const initialState: initialStateTypeOfPayments = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const typeOfPaymentsReduxer = createSlice({
  name: 'type-of-payments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeOfPayments.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.totalCount = action.payload.pagination.totalCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTypeOfPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypeOfPayments.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching type of payments';
      });
  },
});
