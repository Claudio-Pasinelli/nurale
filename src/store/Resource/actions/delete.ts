import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BASE, API, V1, RESOURCES } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const deleteResource = createAsyncThunk(
  'delete/Resource',
  async (id: number | undefined | null, thunkAPI) => {
    try {
      const response = await apiClient.delete<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCES}/${id}`,
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }

      return thunkAPI.rejectWithValue('error');
    } catch (error: any) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
