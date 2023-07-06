import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from 'utils/helpers/apiClient';
import { Skill } from 'utils';
import { API, BASE, SKILLS, V1 } from 'utils/costants/urls';

export const createSkill = createAsyncThunk('user', async (params: Skill | undefined, thunkAPI) => {
  try {
    const response = await apiClient.post<AxiosResponse>({
      url: `${BASE}${API}${V1}${SKILLS}`,
      body: params,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return thunkAPI.rejectWithValue('error');
  } catch (error: any) {
    return thunkAPI.rejectWithValue('error');
  }
});
