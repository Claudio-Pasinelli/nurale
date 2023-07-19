import { number } from 'zod';

export interface Column {
  id: string;
  name: string;
  transform?: (value: any) => any;
}

export interface skipAndTake {
  skip: number | undefined;
  take: number;
}

export interface User {
  email: string;
  password?: string;
  passwordConfirm?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  resourceId: number;
  id?: number;
  createdAt?: Date;
  hasDarkTheme?: boolean;
  role?: string;
  uid?: string;
  updatedAt?: Date;
}

export interface Skill {
  name: string;
  note: string;
  skillType: string;
  id?: number | null;
}
export interface TypeOfPayment {
  daysBetweenPayments: number;
  daysOffsetPayments: number | undefined;
  daysToFirstPayment: number | undefined;
  movePaymentsToTheEndOfMonth: boolean;
  name: string;
  note: string;
  numberOfPayments: number;
  id?: number | null;
}

export interface Customer {
  name: string;
  note: string;
  typeOfPaymentId: number | string;
  id?: number | null;
}

export interface Supplier {
  name: string;
  note: string | null;
  typeOfPaymentId: number | string;
  id?: number | null;
}

export interface Resource {
  firstName: string;
  lastName: string;
  curriculumVitae: string;
  hourCost: number | undefined;
  hourRevenue: number | undefined;
  dailyCost?: number | undefined;
  dailyRevenue?: number | undefined;
  note: string;
  supplierId: number | undefined;
  id?: number | null;
}

export interface ResourceSkill {
  level: number | undefined;
  note: string | null;
  resource?: {
    id: number;
    name: string;
  };
  resourceId: number | string | null;
  skill?: {
    id: number;
    name: string;
  };
  skillId: number | string | null;
  id?: number | null;
}

export interface QueryParams {
  dispatch?: any;
  skip?: number;
  take?: number;
  skillType?: string;
  hasEndOfMonth?: boolean;
  typeOfPaymentId?: string | number | null;
  supplierId?: number | null;
  hasCV?: boolean;
  skillId?: number | null;
  level?: number | null;
  resourceId?: number | null;
}
export interface LoginResponse {
  user: {
    stsTokenManager: {
      accessToken: string;
      refreshToken: string;
    }; // DA RIVEDERE !!!!!!!!!!!!!!!!
  };
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
