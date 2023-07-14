import { createSlice } from '@reduxjs/toolkit';
import { initialStateResource } from '../types';
import { createResource, deleteResource, editResource } from '../actions';
const initialState: initialStateResource = {
  data: null,
  loading: false,
  error: null,
};

export const resourceReduxer = createSlice({
  name: 'resource',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // casi per la creazione della resource
      .addCase(createResource.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResource.rejected, (state) => {
        state.error = 'Error creating resource';
        state.loading = false;
      })

      // casi per la cancellazione della resource
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResource.rejected, (state) => {
        state.error = 'Error deleting resource';
        state.loading = false;
      })

      // casi per la modifica della resource
      .addCase(editResource.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editResource.rejected, (state) => {
        state.error = 'Error updating resource';
        state.loading = false;
      });
  },
});
