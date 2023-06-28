import { createSlice } from '@reduxjs/toolkit';
import { createSkill } from '../actions';
import { initialStateUser } from '../types';
import { deleteSkill } from '../actions/delete';

const initialState : initialStateUser =
{
    data: null,
    loading: false,
    error: null,
};

export const skillReduxer = createSlice(
    {
        name: 'skill',
        initialState,
        reducers:{},
        extraReducers: (builder) =>
        {
            builder
                // casi per la creazione della skill
                .addCase(createSkill.fulfilled, (state, action) =>
                {
                    state.data = action.payload;
                    state.loading = false;
                })
                .addCase(createSkill.pending, (state) =>
                {
                    state.loading = true;

                    // resetto l'errore precedente
                    state.error = null;
                })
                .addCase(createSkill.rejected, (state) =>
                {
                    state.error = 'Error creating skill';
                    state.loading = false;
                })

                // casi per la cancellazione della skill
                .addCase(deleteSkill.fulfilled, (state, action) =>
                {
                    state.loading = false;
                })
                .addCase(deleteSkill.pending, (state) =>
                {
                    state.loading = true;

                    // resetto l'errore precedente
                    state.error = null;
                })
                .addCase(deleteSkill.rejected, (state) =>
                {
                    state.error = 'Error deleting skill';
                    state.loading = false;
                })
        }
    }
)