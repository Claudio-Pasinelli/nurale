import axios from 'axios';
import checkTokenValidity from '../auth/checkTokenValidity';
import { queryString } from './index';
import { ParamsUrl } from './types';
import { BASE } from '../costants/urls';

const instance = axios.create({
  baseURL: BASE,
  headers: {
    'content-type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config:any) => {
    const token = await checkTokenValidity();
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    }
    delete instance.defaults.headers.common['Authorization'];
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const axiosGet = async <AxiosResponse>({ url, params }: ParamsUrl): Promise<AxiosResponse> => {
  const query = queryString(params);
  try {
    return instance.get(`${url}${query || ''}`);
  } catch (error: any) {
    return error;
  }
};

export const axiosPut = async <AxiosResponse>({ url, body }: ParamsUrl): Promise<AxiosResponse> => {
  try {
    return instance.put(url, body);
  } catch (error: any) {
    return error;
  }
};

export const axiosPatch = async <AxiosResponse>({
  url,
  body,
}: ParamsUrl): Promise<AxiosResponse> => {
  try {
    return instance.patch(url, body);
  } catch (error: any) {
    return error;
  }
};

export const axiosPost = async <AxiosResponse>({
  url,
  body,
}: ParamsUrl): Promise<AxiosResponse> => {
  try {
    return instance.post(url, body);
  } catch (error: any) {
    return error;
  }
};

export const axiosPostFile = async <AxiosResponse>({
  url,
  file,
}: ParamsUrl & { file: File }): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    return instance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error: any) {
    return error;
  }
};

export const axiosDownload = async <AxiosResponse>({
  url,
  params,
  contentType,
}: ParamsUrl & { contentType: string }): Promise<AxiosResponse> => {
  const query = queryString(params);
  try {
    return instance.get(`${url}${query || ''}`, {
      headers: { 'Content-Type': contentType },
      responseType: 'blob',
    });
  } catch (error: any) {
    return error;
  }
};

export const axiosDelete = async <AxiosResponse>({
  url,
  params,
}: ParamsUrl): Promise<AxiosResponse> => {
  try {
    return instance.delete(url, {
      params,
    });
  } catch (error: any) {
    return error;
  }
};

export default class apiClient {
  static get = axiosGet;
  static post = axiosPost;
  static put = axiosPut;
  static patch = axiosPatch;
  static delete = axiosDelete;
  static postFile = axiosPostFile;
  static download = axiosDownload;
}