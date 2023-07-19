import { RootState } from 'store/applicationStore';
import { createSelector } from 'reselect';

export const getUserState = (state: RootState) => state.user;

export const getUser = createSelector(getUserState, (state) => state.data);

export const getUserLoading = createSelector(getUserState, (state) => state.loading);

export const getUserError = createSelector(getUserState, (state) => state.error);

export const getUserFirstName = createSelector(getUserState, (state) => state.data?.firstName);

export const getUserLastName = createSelector(getUserState, (state) => state.data?.lastName);

export const getUserRole = createSelector(getUserState, (state) => state.data?.role);
