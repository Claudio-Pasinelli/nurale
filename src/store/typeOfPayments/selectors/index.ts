import { RootState } from 'store/applicationStore';
import { createSelector } from 'reselect';

export const getTypeOfPaymentsState = (state: RootState) => state.typeOfPayments;

export const getTypeOfPayments = createSelector(getTypeOfPaymentsState, (state) => state.data);

export const getTypeOfPaymentsLoading = createSelector(
  getTypeOfPaymentsState,
  (state) => state.loading,
);

export const getTypeOfPaymentsError = createSelector(
  getTypeOfPaymentsState,
  (state) => state.error,
);

export const getTypeOfPaymentsTotalCount = createSelector(
  getTypeOfPaymentsState,
  (state) => state.totalCount,
);
