import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Resource } from 'utils';
import { BASE, API, V1, RESOURCES } from 'utils/costants/urls';
import apiClient from 'utils/helpers/apiClient';

export const editResource = createAsyncThunk(
  'edit/Resource',
  async (params: Resource | undefined, thunkAPI) => {
    try {
      const body = {
        firstName: params?.firstName,
        lastName: params?.lastName,
        note: params?.note,
        curriculumVitae: params?.curriculumVitae,
        hourCost: params?.hourCost,
        hourRevenue: params?.hourRevenue,
        supplierId: params?.supplierId,
      };

      const response = await apiClient.patch<AxiosResponse>({
        url: `${BASE}${API}${V1}${RESOURCES}/${params?.id}`,
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
