import { RootState } from '../../applicationStore';
import { createSelector } from 'reselect';

export const getUserState = (state : RootState) => state.user;

export const getUser = createSelector(
    getUserState,
    (state)=> state.data
);

export const getUsersLoading = createSelector(
    getUserState,
    (state)=> state.loading
);

export const getUsersError = createSelector(
    getUserState,
    (state)=> state.error
);

export const getUserFirstName = createSelector(
    getUserState,
    (state)=> state.data?.firstName
);

export const getUserLastName = createSelector(
    getUserState,
    (state)=> state.data?.lastName
);

