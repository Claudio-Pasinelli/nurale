import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import apiClient from '../../../utils/helpers/apiClient';
import { API, AUTH, BASE, LOGIN, V1 } from '../../../utils/costants/urls';
import { User, addTokenCookies } from '../../../utils';
import { Userlogin } from '../types';

interface LoginResponse {
  user: Userlogin;
}

export const loginUser = createAsyncThunk('auth/login', async (data: User, thunkAPI) => {
  try {
    const response = await apiClient.post<AxiosResponse>({
      url: `${BASE}${API}${V1}${AUTH}${LOGIN}`,
      body: { ...data },
    });

    if (response.status === 200 || response.status === 201) {
      const data: LoginResponse = response.data;
      addTokenCookies({
        token: data.user.stsTokenManager.accessToken,
        refreshToken: data.user.stsTokenManager.refreshToken,
      });

      return response.data;
    }

    return null;
  } catch (error: any) {
    return null;
  }
});
