export interface User
{
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    resourceId: number,
  }
  
export interface Skills
{
    name: string;
    note: string;
    skillType: string;
}

export interface QueryParams
{
    search?: string;
    skip?: number;
    take?: number;
    skillType?: string;
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