export interface SettingsTypeOfPayment {
  daysBetweenPayments: number;
  daysOffsetPayments: number | undefined;
  daysToFirstPayment: number | undefined;
  movePaymentsToTheEndOfMonth: boolean;
  name: string;
  note: string;
  numberOfPayments: number;
}
