import { ResourceSkill } from 'utils';

export interface initialStateResourceSkill {
  data: ResourceSkill | null;
  loading: boolean;
  error: string | null;
}
