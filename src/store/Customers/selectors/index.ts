import { RootState } from '../../applicationStore';
import { createSelector } from 'reselect';

export const getCustomersState = (state: RootState) => state.customers;

export const getCustomers = createSelector(getCustomersState, (state) => state.data);

export const getCustomersLoading = createSelector(getCustomersState, (state) => state.loading);

export const getCustomersError = createSelector(getCustomersState, (state) => state.error);

export const getCustomerstTotalCount = createSelector(
  getCustomersState,
  (state) => state.totalCount,
);
