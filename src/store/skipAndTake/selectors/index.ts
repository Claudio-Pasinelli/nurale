import { RootState } from 'store/applicationStore';
import { createSelector } from 'reselect';

export const getSkipAndTakeState = (state: RootState) => state.skipAndTake;

export const getSkipAndTake = createSelector(getSkipAndTakeState, (state) => state.data);

export const getSkip = createSelector(getSkipAndTake, (state) => state?.skip);

export const getTake = createSelector(getSkipAndTake, (state) => state?.take);
