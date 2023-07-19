import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from 'utils/helpers/apiClient';
import { BASE, API, V1, USERS } from 'utils/costants/urls';
import { QueryParams } from 'utils';
import { sendSkipAndTake } from 'store/skipAndTake';
import { fetchResources } from 'store/Resources';

export const fetchUsers = createAsyncThunk(
  'fetch/users',
  async (fetchParams: QueryParams | undefined, thunkAPI) => {
    const skipAndTakeObj: any = thunkAPI.getState();

    const skipAndTake = skipAndTakeObj.skipAndTake.data;

    const skip = skipAndTake.skip;
    const take = skipAndTake.take;

    const params = {
      skip: skip,
      take: take,
    };

    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${USERS}`,
        params,
      });

      if (response.status === 200) {
        if (fetchParams?.dispatch) {
          const dispatch = fetchParams?.dispatch;
          dispatch(sendSkipAndTake(0, 100));
          await dispatch(fetchResources());
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
