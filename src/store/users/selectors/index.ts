import { RootState } from 'store/applicationStore';
import { createSelector } from 'reselect';

export const getUsersState = (state: RootState) => state.users;

export const getUsers = createSelector(getUsersState, (state) => state.data);

export const getUsersLoading = createSelector(getUsersState, (state) => state.loading);

export const getUsersError = createSelector(getUsersState, (state) => state.error);

export const getUsersTotalCount = createSelector(getUsersState, (state) => state.totalCount);
