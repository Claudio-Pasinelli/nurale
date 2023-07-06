import { Customer } from 'utils';

export interface initialStateCustomer {
  data: Customer | null;
  loading: boolean;
  error: string | null;
}
