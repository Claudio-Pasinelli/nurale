import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { API, AUTH, BASE, LOGIN, V1 } from '../../../utils/costants/urls';
import { removeTokenCookies } from '../../../utils';

export const refreshToken = createAsyncThunk('auth/refreshToken', async (data: any, thunkAPI) => {
  try {
    const response = await apiClient.delete<AxiosResponse>({
      url: `${BASE}${API}${V1}${AUTH}${LOGIN}`,
      body: { ...data },
    });

    if (response.status === 200 || response.status === 201) {
      removeTokenCookies();

      return response.data;
    }

    return null;
  } catch (error: any) {
    return null;
  }
});
