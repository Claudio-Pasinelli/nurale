import { Customer } from '../../../utils';

export interface initialStateCustomers {
  data: Customer[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
