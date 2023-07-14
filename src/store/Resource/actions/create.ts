import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Resource } from 'utils';
import { BASE, API, V1, RESOURCES } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const createResource = createAsyncThunk(
  'resource',
  async (params: Resource | undefined, thunkAPI) => {
    try {
      const response = await apiClient.post<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCES}`,
        body: params,
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
