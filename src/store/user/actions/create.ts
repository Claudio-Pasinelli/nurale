import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { BASE, API, V1, USERS } from '../../../utils/costants/urls';
import { User } from '../../../utils';

export const createUser = createAsyncThunk(
    'user',
    async (params: User | undefined, thunkAPI) => {
      try {
        const response = await apiClient.post<AxiosResponse>({
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
    }
  );