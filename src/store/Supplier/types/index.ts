import { Supplier } from 'utils';

export interface initialStateSupplier {
  data: Supplier | null;
  loading: boolean;
  error: string | null;
}
