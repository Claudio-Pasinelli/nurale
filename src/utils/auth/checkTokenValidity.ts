import {

    addTokenCookies,
    getTokenCookies,
    removeTokenCookies,
  } from './authCookies';
import {
    BASE,
    URL_REFRESH,
    V1,
    API,
    AUTH,
    // isTokenExpired,
  } from '../costants/urls';
  import axios, { AxiosResponse } from 'axios';
import { isTokenExpired } from './tokenTimeCheck';
  
  interface ReturnFunction {
    token: string;
    refresh: string;
  }
  
  const fetchRefreshToken = async (refreshToken: string): Promise<ReturnFunction | null> => {
    axios.defaults.baseURL = BASE;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    try {
      const response: AxiosResponse = await axios.post(`${BASE}${API}${V1}${AUTH}${URL_REFRESH}`, {
        token: refreshToken,
      });
  
      if (response.status === 200 || response.status === 201) {
        const token = response.data.access_token;
        const refresh = response.data.refresh_token;
  
        return { token, refresh };
      }
      return null;
    } catch (error: any) {
      return null;
    }
  };
  
  export default async function checkTokenValidity(): Promise<string | null> {
    const { token, refreshToken } = getTokenCookies();
  
    const isExpired = await isTokenExpired(token);
  
    if (!isExpired) {
      return token;
    }
  
    if (token && refreshToken) {
      try {
        const result = await fetchRefreshToken(refreshToken);
        const { token, refresh } = result || {};
        if (token && refresh) {
          addTokenCookies({ token, refreshToken: refresh });
          return token;
        }
        removeTokenCookies();
        window.location.replace('/login');
        return null;
      } catch (error: any) {
        removeTokenCookies();
        window.location.replace('/login');
        return null;
      }
    }
  
    removeTokenCookies();
    return null;
  }