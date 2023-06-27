import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import { JwtTokenDecoded } from '../models';

export const isTokenExpired = async (token: string | null): Promise<boolean> => {
  if (token) {
    try {
      const decoded: JwtTokenDecoded = await jwtDecode(token);
      if (decoded) {
        const { exp } = decoded;
        const now = dayjs().unix();
        return exp < now;
      }
    } catch (error: any) {
      return true;
    }
  }
  return true;
};