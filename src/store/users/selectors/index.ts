import { RootState } from '../../applicationStore';
import { createSelector } from 'reselect';

export const getUsersState = (state : RootState) => state.users;

export const getUsers = createSelector(
    getUsersState,
    (state)=> state.data
);

export const getUsersLoading = createSelector(
    getUsersState,
    (state)=> state.loading
);

export const getUsersError = createSelector(
    getUsersState,
    (state)=> state.error
);

export const getUsersPagination = createSelector(
    getUsersState,
    (state)=> state.pagination
);

