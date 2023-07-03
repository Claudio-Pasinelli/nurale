import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BASE, API, V1, TYPE_OF_PAYMENTS } from '../../../utils/costants/urls';
import apiClient from '../../../utils/helpers/apiClient';

export const deleteTypeOfPayment = createAsyncThunk('delete/User', async (id: number | undefined | null, thunkAPI) => {
  try {
    const response = await apiClient.delete<AxiosResponse>({
      url: `${BASE}${API}${V1}${TYPE_OF_PAYMENTS}/${id}`,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return thunkAPI.rejectWithValue('error');
  } catch (error: any) {
    return thunkAPI.rejectWithValue('error');
  }
});