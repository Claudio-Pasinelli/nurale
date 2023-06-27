import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions';
import { initialStateLogin } from '../types';

const initialState : initialStateLogin =
{
    data: [],
    loading: false,
    error: null,
};

export const loginReduxer = createSlice(
    {
        name: 'login',
        initialState,
        reducers:{},

        extraReducers: (builder) =>
        {
            builder
                .addCase(loginUser.fulfilled, (state, action) =>
                {
                    state.data = action.payload;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(loginUser.pending, (state) =>
                {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(loginUser.rejected, (state) =>
                {
                    state.loading = false;
                    state.error = 'Error during login';
                })

                // .addCase(resetCard, (state) =>
                // {
                //     return initialState;
                // })
        }
    }
)