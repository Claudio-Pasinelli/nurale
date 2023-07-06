import { User } from 'utils';

export interface initialStateUser {
  data: User | null;
  loading: boolean;
  error: string | null;
}
