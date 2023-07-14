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

    let params;

    fetchParams?.supplierId && fetchParams?.hasCV != undefined
      ? (params = {
          supplierId: fetchParams?.supplierId,
          hasCV: fetchParams?.hasCV,
          skip: skip,
          take: take,
        })
      : fetchParams?.supplierId
      ? (params = {
          supplierId: fetchParams?.supplierId,
          skip: skip,
          take: take,
        })
      : fetchParams?.hasCV != undefined
      ? (params = {
          hasCV: fetchParams?.hasCV,
          skip: skip,
          take: take,
        })
      : (params = {
          skip: skip,
          take: take,
        });

    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCES}`,
        params,
      });

      if (response.status === 200) {
        if (fetchParams?.dispatch) {
          const dispatchFetch = fetchParams?.dispatch;
          dispatchFetch(sendSkipAndTake(0, 100));
          await dispatchFetch(fetchSuppliers());
          dispatchFetch(sendSkipAndTake(skip, take));
        }
        return response.data;
      }

      return thunkAPI.rejectWithValue('error');
    } catch (error: any) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
