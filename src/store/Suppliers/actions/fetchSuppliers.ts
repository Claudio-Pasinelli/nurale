import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { fetchTypeOfPayments } from 'store/typeOfPayments';
import { QueryParams } from 'utils';
import { BASE, API, V1, SUPPLIERS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const fetchSuppliers = createAsyncThunk(
  'fetch/suppliers',
  async (fetchParams: QueryParams | undefined, thunkAPI) => {
    let params;
    const skipAndTakeObj: any = thunkAPI.getState();

    const skipAndTake = skipAndTakeObj.skipAndTake.data;

    const skip = skipAndTake.skip;
    const take = skipAndTake.take;

    fetchParams?.skip && fetchParams.take
      ? (params = {
          skip: fetchParams.skip,
          take: fetchParams.take,
        })
      : fetchParams?.typeOfPaymentId
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
        url: `${BASE}${API}${V1}${SUPPLIERS}`,
        params,
      });

      if (response.status === 200) {
        if (fetchParams?.dispatch) {
          const dispatch = fetchParams?.dispatch;
          dispatch(fetchTypeOfPayments());
        }
        return response.data;
      }

      return thunkAPI.rejectWithValue('error');
    } catch (error: any) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
