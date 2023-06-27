import Cookies from 'js-cookie';
import { REFRESH_TOKEN, TOKEN } from '../costants/auth';

export function removeTokenCookies(): void {
  Cookies.remove(TOKEN);
  Cookies.remove(REFRESH_TOKEN);
}

export function addTokenCookies({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}): void {
  Cookies.set(TOKEN, token);
  Cookies.set(REFRESH_TOKEN, refreshToken);
}

export function getTokenCookies(): {
  token: string | null;
  refreshToken: string | null;
} {
  const token = Cookies.get(TOKEN) || null;
  const refreshToken = Cookies.get(REFRESH_TOKEN) || null;
  return {
    token,
    refreshToken,
  };
}