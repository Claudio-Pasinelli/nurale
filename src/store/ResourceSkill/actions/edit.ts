import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ResourceSkill } from 'utils';
import { BASE, API, V1, RESOURCESKILLS } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const editResourceSkill = createAsyncThunk(
  'edit/Resource-Skill',
  async (params: ResourceSkill | undefined, thunkAPI) => {
    try {
      const body = {
        level: params?.level,
        resourceId: params?.resourceId,
        skillId: params?.skillId,
        note: params?.note,
      };

      const response = await apiClient.patch<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCESKILLS}/${params?.id}`,
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
