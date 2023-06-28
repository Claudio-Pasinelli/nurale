import { User } from '../../../utils';

export interface initialStateUsers
{
    data: User[];
    pagination: number;
    loading: boolean;
    error: null | string;
}