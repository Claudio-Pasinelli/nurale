import { Skill } from '../../../utils';

export interface initialStateSkills {
  data: Skill[];
  totalCount: number;
  loading: boolean;
  error: null | string;
}
