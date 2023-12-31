import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Customer } from 'utils';
import { BASE, API, V1, CUSTOMERS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const createCustomer = createAsyncThunk(
  'customer',
  async (params: Customer | undefined, thunkAPI) => {
    try {
      const response = await apiClient.post<AxiosResponse>({
        url: `${BASE}${API}${V1}${CUSTOMERS}`,
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
