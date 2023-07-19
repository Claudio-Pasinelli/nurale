import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { fetchSuppliers } from 'store/Suppliers';
import { sendSkipAndTake } from 'store/skipAndTake';
import { QueryParams } from 'utils';
import { BASE, API, V1, RESOURCES } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const fetchResources = createAsyncThunk(
  'fetch/resources',
  async (fetchParams: QueryParams | undefined, thunkAPI) => {
    const skipAndTakeObj: any = thunkAPI.getState();

    const skipAndTake = skipAndTakeObj.skipAndTake.data;

    const skip = skipAndTake.skip;
    const take = skipAndTake.take;

    const params: QueryParams = {
      skip: skip,
      take: take,
    };

    if (fetchParams?.supplierId) {
      params.supplierId = fetchParams.supplierId;
    }

    if (fetchParams?.hasCV != undefined) {
      params.hasCV = fetchParams.hasCV;
    }

    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCES}`,
        params,
      });

      if (response.status === 200) {
        if (fetchParams?.dispatch) {
          const dispatch = fetchParams?.dispatch;
          dispatch(sendSkipAndTake(0, 100));
          await dispatch(fetchSuppliers());
          dispatch(sendSkipAndTake(skip, take));
        }
        return response.data;
      }

      return thunkAPI.rejectWithValue('error');
    } catch (error: any) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
