import { Supplier } from 'utils';

export interface initialStateSuppliers {
  data: Supplier[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
