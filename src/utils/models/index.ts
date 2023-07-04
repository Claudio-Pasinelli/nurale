export interface Column
{
  id: string;
  name: string;
  transform?: (value: any) => any;
}

export interface User
{
    email: string,
    password?: string,
    passwordConfirm?: string,
    firstName: string,
    lastName: string,
    phone?: string,
    resourceId: number,
    id?: number,
    createdAt?: Date
    hasDarkTheme?: boolean
    role?: string,
    uid?: string,
    updatedAt?: Date
}
  
export interface Skill
{
    name: string;
    note: string;
    skillType: string;
    id?: number | null;
}

export interface TypeOfPayment
{
  daysBetweenPayments: number;
  daysOffsetPayments: number;
  daysToFirstPayment: number;
  movePaymentsToTheEndOfMonth: boolean;
  name: string;
  note: string;
  numberOfPayments: number;
  id?: number | null;
}

export interface QueryParams
{
    search?: string;
    skip?: number;
    take?: number;
    skillType?: string;
    hasEndOfMonth?: boolean;
}
export interface LoginResponse {
  user:
  {
    stsTokenManager:
    {
        accessToken: string,
        refreshToken: string
    },            // DA RIVEDERE !!!!!!!!!!!!!!!!
  },
  role: ROLE;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
}
export interface JwtTokenDecoded {
    role: ROLE;
    iss: string;
    aud: string;
    auth_time: number;
    user_id: string;
    sub: string;
    iat: number;
    exp: number;
    email: string;
    email_verified: boolean;
    firebase: {
      identities: {
        email: string[];
      };
      sign_in_provider: string;
    };
  }
  
  export type ROLE = 'ADMIN' | 'USER';