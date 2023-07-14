import { createSlice } from '@reduxjs/toolkit';
import { fetchResources } from '../actions/fetchResources';
import { initialStateResources } from '../types';

const initialState: initialStateResources = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const resourcesReduxer = createSlice({
  name: 'resources',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.totalCount = action.payload.pagination.totalCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching resources';
      });
  },
});
