import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Customer } from 'utils';
import { BASE, API, V1, CUSTOMERS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const editCustomer = createAsyncThunk(
  'edit/Customer',
  async (params: Customer | undefined, thunkAPI) => {
    try {
      console.log(params?.typeOfPaymentId);
      const body = {
        name: params?.name,
        note: params?.note,
        typeOfPaymentId: params?.typeOfPaymentId,
      };

      const response = await apiClient.patch<AxiosResponse>({
        url: `${BASE}${API}${V1}${CUSTOMERS}/${params?.id}`,
        body: body,
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
