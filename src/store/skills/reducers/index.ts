import { createSlice } from '@reduxjs/toolkit';
import { fetchSkills } from '../actions/fetchSkills';
import { initialStateSkills } from '../types';

const initialState : initialStateSkills =
{
    data: [],
    pagination: 0,
    loading: false,
    error: null,
};

export const skillsReduxer = createSlice(
    {
        name: 'login',
        initialState,
        reducers:{},

        extraReducers: (builder) =>
        {
            builder
                .addCase(fetchSkills.fulfilled, (state, action) =>
                {
                    state.data = action.payload.data;
                    state.pagination = action.payload.pagination.totalCount;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(fetchSkills.pending, (state) =>
                {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchSkills.rejected, (state) =>
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