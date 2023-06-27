import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../actions/fetchUsers';
import { initialStateUsers } from '../types';

const initialState : initialStateUsers =
{
    data: [],
    loading: false,
    error: null,
};

export const usersReduxer = createSlice(
    {
        name: 'login',
        initialState,
        reducers:{},

        extraReducers: (builder) =>
        {
            builder
                .addCase(fetchUsers.fulfilled, (state, action) =>
                {
                    state.data = action.payload.data;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(fetchUsers.pending, (state) =>
                {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchUsers.rejected, (state) =>
                {
                    state.loading = false;
                    // state.error = 'Error during login';
                })

                // .addCase(resetCard, (state) =>
                // {
                //     return initialState;
                // })
        }
    }
)