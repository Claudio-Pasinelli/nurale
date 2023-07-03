import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { BASE, API, V1, TYPE_OF_PAYMENTS } from '../../../utils/costants/urls';
import { TypeOfPayment } from '../../../utils';

export const createTypeOfPayment = createAsyncThunk(
    'typeOfPayment',
    async (params: TypeOfPayment | undefined, thunkAPI) =>
    {
      try
      {
        const response = await apiClient.post<AxiosResponse>({
          url: `${BASE}${API}${V1}${TYPE_OF_PAYMENTS}`,
          body:params,
        });
  
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
  
        return thunkAPI.rejectWithValue('error');
      } catch (error: any) {
        return thunkAPI.rejectWithValue('error');
      }
    }
  );