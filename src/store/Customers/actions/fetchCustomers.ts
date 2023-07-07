import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { QueryParams } from 'utils';
import { BASE, API, V1, CUSTOMERS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const fetchCustomers = createAsyncThunk(
  'fetch/customers',
  async (fetchParams: QueryParams | undefined, thunkAPI) => {
    const skipAndTakeObj: any = thunkAPI.getState();

    const skipAndTake = skipAndTakeObj.skipAndTake.data;

    const skip = skipAndTake.skip;
    const take = skipAndTake.take;

    let params;

    fetchParams?.typeOfPaymentId
      ? (params = {
          typeOfPaymentId: fetchParams?.typeOfPaymentId,
          skip: skip,
          take: take,
        })
      : (params = {
          skip: skip,
          take: take,
        });

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
