
import { createSelector } from 'reselect';
import { RootState } from 'store/applicationStore';

export const getSkillsState = (state: RootState) => state.skills;

export const getSkills = createSelector(getSkillsState, (state) => state.data);

export const getSkillsLoading = createSelector(getSkillsState, (state) => state.loading);

export const getSkillsError = createSelector(getSkillsState, (state) => state.error);

export const getSkillsTotalCount = createSelector(getSkillsState, (state) => state.totalCount);
