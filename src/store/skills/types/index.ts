import { Skill } from '../../../utils';

export interface initialStateSkills
{
    data: Skill[];
    pagination: number;
    loading: boolean;
    error: null | string
}