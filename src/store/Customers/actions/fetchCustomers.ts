import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { BASE, API, V1, CUSTOMERS } from '../../../utils/costants/urls';
import { QueryParams } from '../../../utils';

export const fetchCustomers = createAsyncThunk(
  'fetch/customers',
  async (params: QueryParams | undefined, thunkAPI) => {
    // thunkAPI.getState
    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${CUSTOMERS}`,
        params,
      });

      if (response.status === 200) {
        return response.data;
      }

      return thunkAPI.rejectWithValue('error');
    } catch (error: any) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
