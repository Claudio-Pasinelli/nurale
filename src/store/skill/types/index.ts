import { Skill } from '../../../utils';

export interface initialStateUser
{
    data: Skill | null,
    loading: boolean,
    error: string | null
}