import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { removeTokenCookies } from 'utils';
import { BASE, API, V1, AUTH, LOGIN } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

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
