import { createSelector } from 'reselect';
import { RootState } from 'store';

export const getSuppliersState = (state: RootState) => state.suppliers;

export const getSuppliers = createSelector(getSuppliersState, (state) => state.data);

export const getSuppliersLoading = createSelector(getSuppliersState, (state) => state.loading);

export const getSuppliersError = createSelector(getSuppliersState, (state) => state.error);

export const getSuppliersTotalCount = createSelector(
  getSuppliersState,
  (state) => state.totalCount,
);
