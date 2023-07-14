import { createSlice } from '@reduxjs/toolkit';
import { initialStateCustomer } from '../types';
import { createCustomer, deleteCustomer, editCustomer } from '../actions';

const initialState: initialStateCustomer = {
  data: null,
  loading: false,
  error: null,
};

export const customerReduxer = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // casi per la creazione del customer
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.rejected, (state) => {
        state.error = 'Error creating customer';
        state.loading = false;
      })

      // casi per la cancellazione del customer
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.error = 'Error deleting customer';
        state.loading = false;
      })

      // casi per la modifica del customer
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomer.rejected, (state) => {
        state.error = 'Error updating customer';
        state.loading = false;
      });
  },
});
