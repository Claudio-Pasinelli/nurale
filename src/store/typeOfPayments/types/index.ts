import { TypeOfPayment } from 'utils';

export interface initialStateTypeOfPayments {
  data: TypeOfPayment[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
