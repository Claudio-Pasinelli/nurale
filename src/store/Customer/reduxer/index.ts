import { createSlice } from '@reduxjs/toolkit';
import { initialStateUser } from '../types';
import { createCustomer, deleteCustomer, editCustomer } from '../actions';

const initialState: initialStateUser = {
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
      // casi per la creazione della skill
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

      // casi per la cancellazione della skill
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

      // casi per la modifica della skill
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
