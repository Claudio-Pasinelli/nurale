import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ResourceSkill } from 'utils';
import { BASE, API, V1, RESOURCESKILLS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const createResourceSkill = createAsyncThunk(
  'resource-skill',
  async (params: ResourceSkill | undefined, thunkAPI) => {
    try {
      const response = await apiClient.post<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCESKILLS}`,
        body: params,
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
