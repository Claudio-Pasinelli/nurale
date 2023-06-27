import { createSlice } from '@reduxjs/toolkit';
import { createUser } from '../actions';
import { initialStateUser } from '../types';

const initialState : initialStateUser =
{
    data: null,
    loading: false,
    error: null,
};

export const userReduxer = createSlice(
    {
        name: 'user',
        initialState,
        reducers:{},
        extraReducers: (builder) =>
        {
            builder
                // casi per la creazione dello user
                .addCase(createUser.fulfilled, (state, action) =>
                {
                    state.data = action.payload;
                    state.loading = false;
                })
                .addCase(createUser.pending, (state) =>
                {
                    state.loading = true;

                    // resetto l'errore precedente
                    state.error = null;
                })
                .addCase(createUser.rejected, (state) =>
                {
                    state.error = 'Error loading user';
                    state.loading = false;
                })
        }
    }
)