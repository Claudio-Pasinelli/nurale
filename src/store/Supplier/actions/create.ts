import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Supplier } from 'utils';
import { BASE, API, V1, SUPPLIERS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const createSupplier = createAsyncThunk(
  'supplier',
  async (params: Supplier | undefined, thunkAPI) => {
    try {
      const response = await apiClient.post<AxiosResponse>({
        url: `${BASE}${API}${V1}${SUPPLIERS}`,
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
