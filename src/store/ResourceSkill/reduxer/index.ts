import { createSlice } from '@reduxjs/toolkit';
import { initialStateResourceSkill } from '../types';
import { createResourceSkill, deleteResourceSkill, editResourceSkill } from '../actions';

const initialState: initialStateResourceSkill = {
  data: null,
  loading: false,
  error: null,
};

export const resourceSkillReduxer = createSlice({
  name: 'resource-skill',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // casi per la creazione della resource skill
      .addCase(createResourceSkill.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createResourceSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResourceSkill.rejected, (state) => {
        state.error = 'Error creating resource skill';
        state.loading = false;
      })

      // casi per la cancellazione della resource skill
      .addCase(deleteResourceSkill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteResourceSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResourceSkill.rejected, (state) => {
        state.error = 'Error deleting resource skill';
        state.loading = false;
      })

      // casi per la modifica della resource skill
      .addCase(editResourceSkill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editResourceSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editResourceSkill.rejected, (state) => {
        state.error = 'Error updating resource skill';
        state.loading = false;
      });
  },
});
