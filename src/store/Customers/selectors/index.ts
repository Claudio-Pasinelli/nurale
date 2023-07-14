import { createSelector } from 'reselect';
import { RootState } from 'store';

export const getCustomersState = (state: RootState) => state.customers;

export const getCustomers = createSelector(getCustomersState, (state) => state.data);

export const getCustomersLoading = createSelector(getCustomersState, (state) => state.loading);

export const getCustomersError = createSelector(getCustomersState, (state) => state.error);

export const getCustomersTotalCount = createSelector(
  getCustomersState,
  (state) => state.totalCount,
);
