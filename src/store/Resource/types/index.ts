import { Resource } from 'utils';

export interface initialStateResource {
  data: Resource | null;
  loading: boolean;
  error: string | null;
}
