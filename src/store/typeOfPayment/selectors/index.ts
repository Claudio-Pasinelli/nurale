import { RootState } from '../../applicationStore';
import { createSelector } from 'reselect';

export const getTypeOfPaymentState = (state: RootState) => state.typeOfPayment;

export const getTypeOfPayment = createSelector(getTypeOfPaymentState, (state) => state.data);

export const getTypeOfPaymentLoading = createSelector(
  getTypeOfPaymentState,
  (state) => state.loading,
);

export const getTypeOfPaymentError = createSelector(getTypeOfPaymentState, (state) => state.error);
