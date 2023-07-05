import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BASE, API, V1, SKILLS } from '../../../utils/costants/urls';
import apiClient from '../../../utils/helpers/apiClient';
import { Customer } from '../../../utils';

export const editCustomer = createAsyncThunk(
  'edit/Customer',
  async (params: Customer | undefined, thunkAPI) => {
    try {
      // const body = {
      //   name: params?.name,
      //   note: params?.note,
      //   skillType: params?.skillType,
      // };

      const response = await apiClient.patch<AxiosResponse>({
        url: `${BASE}${API}${V1}${SKILLS}/${params?.id}`,
        // body: body,
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
