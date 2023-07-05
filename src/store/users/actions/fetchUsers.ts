import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { BASE, API, V1, USERS } from '../../../utils/costants/urls';
import { QueryParams } from '../../../utils';

export const fetchUsers = createAsyncThunk(
  'fetch/users',
  async (params: QueryParams | undefined, thunkAPI) => {
    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${USERS}`,
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
