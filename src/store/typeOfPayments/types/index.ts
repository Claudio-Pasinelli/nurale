import { TypeOfPayment } from '../../../utils';

export interface initialStateTypeOfPayments
{
    data: TypeOfPayment[];
    pagination: number;
    loading: boolean;
    error: null | string
}