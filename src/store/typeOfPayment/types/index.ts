import { TypeOfPayment } from 'utils';

export interface initialStateTypeOfPayment {
  data: TypeOfPayment | null;
  loading: boolean;
  error: string | null;
}
