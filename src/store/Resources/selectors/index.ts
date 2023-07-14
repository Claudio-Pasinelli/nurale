import { createSelector } from 'reselect';
import { RootState } from 'store';

export const getResourcesState = (state: RootState) => state.resources;

export const getResources = createSelector(getResourcesState, (state) => state.data);

export const getResourcesLoading = createSelector(getResourcesState, (state) => state.loading);

export const getResourcesError = createSelector(getResourcesState, (state) => state.error);

export const getResourcesTotalCount = createSelector(
  getResourcesState,
  (state) => state.totalCount,
);
