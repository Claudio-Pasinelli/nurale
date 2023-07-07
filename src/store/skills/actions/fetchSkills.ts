import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from 'utils/helpers/apiClient';
import { BASE, API, V1, SKILLS } from 'utils/costants/urls';
import { QueryParams } from 'utils';

export const fetchSkills = createAsyncThunk(
  'fetch/users',
  async (fetchParams: QueryParams | undefined, thunkAPI) => {
    const skipAndTakeObj: any = thunkAPI.getState();

    const skipAndTake = skipAndTakeObj.skipAndTake.data;

    const skip = skipAndTake.skip;
    const take = skipAndTake.take;

    let params;

    fetchParams?.skillType
      ? (params = {
          skillType: fetchParams?.skillType,
          skip: skip,
          take: take,
        })
      : (params = {
          skip: skip,
          take: take,
        });

    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${SKILLS}`,
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
