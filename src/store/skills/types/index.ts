import { Skills } from '../../../utils';

export interface initialStateSkills
{
    data: Skills[];
    pagination: number;
    loading: boolean;
    error: null | string
}