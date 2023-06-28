import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BASE, API, V1, USERS } from '../../../utils/costants/urls';
import apiClient from '../../../utils/helpers/apiClient';

export const deleteUser = createAsyncThunk('delete/User', async (id: number, thunkAPI) => {
  try {
    const response = await apiClient.delete<AxiosResponse>({
      url: `${BASE}${API}${V1}${USERS}/${id}`,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return thunkAPI.rejectWithValue('error');
  } catch (error: any) {
    return thunkAPI.rejectWithValue('error');
  }
});