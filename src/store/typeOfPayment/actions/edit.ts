import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BASE, API, V1, TYPE_OF_PAYMENTS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';
import { TypeOfPayment } from 'utils';

export const editTypeOfPayment = createAsyncThunk(
  'edit/type-of-payment',
  async (params: TypeOfPayment | undefined, thunkAPI) => {
    try {
      const body = {
        daysBetweenPayments: params?.daysBetweenPayments,
        daysOffsetPayments: params?.daysOffsetPayments,
        daysToFirstPayment: params?.daysToFirstPayment,
        movePaymentsToTheEndOfMonth: params?.movePaymentsToTheEndOfMonth,
        name: params?.name,
        note: params?.note,
        numberOfPayments: params?.numberOfPayments,
      };

      const response = await apiClient.patch<AxiosResponse>({
        url: `${BASE}${API}${V1}${TYPE_OF_PAYMENTS}/${params?.id}`,
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
