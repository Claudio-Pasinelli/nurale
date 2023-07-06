import { User } from 'utils';

export interface initialStateUsers {
  data: User[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
