import { Resource } from 'utils';

export interface initialStateResources {
  data: Resource[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
