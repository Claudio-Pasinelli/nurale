import { User } from '../../../utils';

export interface initialStateUsers
{
    data: User[];
    loading: boolean;
    error: null | string
}