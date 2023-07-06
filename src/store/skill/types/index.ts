import { Skill } from 'utils';

export interface initialStateSkill {
  data: Skill | null;
  loading: boolean;
  error: string | null;
}
