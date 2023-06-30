import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { BASE, API, V1, USERS, ME } from '../../../utils/costants/urls';

export const fetchMe = createAsyncThunk(
    'fetch/user/me',
    async (_, thunkAPI) => {
      try {
        const response = await apiClient.get<AxiosResponse>({
          url: `${BASE}${API}${V1}${USERS}${ME}`,
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