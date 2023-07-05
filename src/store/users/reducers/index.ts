import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../actions/fetchUsers';
import { initialStateUsers } from '../types';

const initialState: initialStateUsers = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const usersReduxer = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.totalCount = action.payload.pagination.totalCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching users';
      });
  },
});
