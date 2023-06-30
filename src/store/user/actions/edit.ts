import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BASE, API, V1, USERS } from '../../../utils/costants/urls';
import apiClient from '../../../utils/helpers/apiClient';
import { User } from '../../../utils';

export const editUser = createAsyncThunk('edit/User', async (params: User | undefined, thunkAPI) => {
  try {
    const body =
    {
      firstName: params?.firstName,
      hasDarkTheme: false, // DA RIVEDERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      lastName: params?.lastName,
      phone: params?.phone,
    }

    const response = await apiClient.patch<AxiosResponse>({
      url: `${BASE}${API}${V1}${USERS}/${params?.id}`,
      body:body,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return thunkAPI.rejectWithValue('error');
  } catch (error: any) {
    return thunkAPI.rejectWithValue('error');
  }
});