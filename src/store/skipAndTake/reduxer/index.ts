import { createSlice } from '@reduxjs/toolkit';
import { sendSkipAndTake } from '../actions';
import { initialStateSkipAndTake } from '../types';

const initialState: initialStateSkipAndTake = {
  data: null
};

export const skipAndTakeReducer = createSlice({
  name: 'skipAndTake',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendSkipAndTake, (state, action) => {
        state.data = action.payload;
      })
  },
});
