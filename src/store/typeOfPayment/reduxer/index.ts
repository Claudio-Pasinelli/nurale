import { createSlice } from '@reduxjs/toolkit';
import { createTypeOfPayment, editTypeOfPayment } from '../actions';
import { initialStateTypeOfPayment } from '../types';
import { deleteTypeOfPayment } from '../actions/delete';

const initialState: initialStateTypeOfPayment = {
  data: null,
  loading: false,
  error: null,
};

export const typeOfPaymentReduxer = createSlice({
  name: 'type-of-payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // casi per la creazione del tipo di pagamento
      .addCase(createTypeOfPayment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createTypeOfPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTypeOfPayment.rejected, (state) => {
        state.error = 'Error creating type of payment';
        state.loading = false;
      })

      // casi per la cancellazione del tipo di pagamento
      .addCase(deleteTypeOfPayment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTypeOfPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTypeOfPayment.rejected, (state) => {
        state.error = 'Error deleting type of payment';
        state.loading = false;
      })

      // casi per la modifica del tipo di pagamento
      .addCase(editTypeOfPayment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editTypeOfPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTypeOfPayment.rejected, (state) => {
        state.error = 'Error updating type of payment';
        state.loading = false;
      });
  },
});
