import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { fetchResources } from 'store/Resources/actions';
import { fetchSkills } from 'store/skills';
import { sendSkipAndTake } from 'store/skipAndTake';
import { QueryParams } from 'utils';
import { BASE, API, V1, RESOURCESKILLS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const fetchResourceSkills = createAsyncThunk(
  'fetch/resources-skills',
  async (fetchParams: QueryParams | undefined, thunkAPI) => {
    const skipAndTakeObj: any = thunkAPI.getState();

    const skipAndTake = skipAndTakeObj.skipAndTake.data;

    const skip = skipAndTake.skip;
    const take = skipAndTake.take;

    const params: QueryParams = {
      skip: skip,
      take: take,
    };

    if (fetchParams?.resourceId) {
      params.resourceId = fetchParams.resourceId;
    }

    if (fetchParams?.skillId) {
      params.skillId = fetchParams.skillId;
    }

    if (fetchParams?.level) {
      params.level = fetchParams.level;
    }

    try {
      const response = await apiClient.get<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCESKILLS}`,
        params,
      });

      if (response.status === 200) {
        if (fetchParams?.dispatch) {
          const dispatch = fetchParams?.dispatch;
          dispatch(sendSkipAndTake(0, 100));
          await dispatch(fetchResources());
          dispatch(sendSkipAndTake(0, 100));
          await dispatch(fetchSkills());
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
