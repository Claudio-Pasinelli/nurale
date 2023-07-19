import { ResourceSkill } from 'utils';

export interface initialStateResourcesSkills {
  data: ResourceSkill[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
