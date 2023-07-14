import { createSlice } from '@reduxjs/toolkit';
import { initialStateSupplier } from '../types';
import { createSupplier, deleteSupplier, editSupplier } from '../actions';

const initialState: initialStateSupplier = {
  data: null,
  loading: false,
  error: null,
};

export const supplierReduxer = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // casi per la creazione del supplier
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplier.rejected, (state) => {
        state.error = 'Error creating supplier';
        state.loading = false;
      })

      // casi per la cancellazione del supplier
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.rejected, (state) => {
        state.error = 'Error deleting supplier';
        state.loading = false;
      })

      // casi per la modifica del supplier
      .addCase(editSupplier.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSupplier.rejected, (state) => {
        state.error = 'Error updating supplier';
        state.loading = false;
      });
  },
});
