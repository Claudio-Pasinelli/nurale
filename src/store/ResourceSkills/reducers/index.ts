import { createSlice } from '@reduxjs/toolkit';
import { fetchResourceSkills } from '../actions/fetchResourceSkills';
import { initialStateResourcesSkills } from '../types';

const initialState: initialStateResourcesSkills = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const resourceSkillsReduxer = createSlice({
  name: 'resources-skills',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceSkills.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.totalCount = action.payload.pagination.totalCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchResourceSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourceSkills.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching resource skills';
      });
  },
});
