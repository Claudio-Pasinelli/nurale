import { createSelector } from 'reselect';
import { RootState } from 'store';

export const getResourceSkillsState = (state: RootState) => state.resourceSkills;

export const getResourceSkills = createSelector(getResourceSkillsState, (state) => state.data);

export const getResourcesSkillsLoading = createSelector(
  getResourceSkillsState,
  (state) => state.loading,
);

export const getResourcesSkillsError = createSelector(
  getResourceSkillsState,
  (state) => state.error,
);

export const getResourcesSkillsTotalCount = createSelector(
  getResourceSkillsState,
  (state) => state.totalCount,
);
