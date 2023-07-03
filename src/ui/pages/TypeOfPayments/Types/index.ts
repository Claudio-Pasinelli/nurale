export interface SettingsTypeOfPayment
{
    daysBetweenPayments: number;
    daysOffsetPayments: number;
    daysToFirstPayment: number;
    movePaymentsToTheEndOfMonth: boolean;
    name: string;
    note: string;
    numberOfPayments: number;
}