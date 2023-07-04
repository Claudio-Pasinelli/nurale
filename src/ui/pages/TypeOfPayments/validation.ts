/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, { message: 'Nome troppo corto' }).max(15, { message: 'Nome troppo lungo' }),
    note: z.string().min(3, { message: 'Note troppo corte' }).max(15, { message: 'Note troppo lunghe' }),

    daysBetweenPayments: z.number(
    {
      required_error: 'Obbligatorio',
      invalid_type_error: 'Valore numerico inserito non valido.',
    }).nonnegative(),

    daysOffsetPayments: z.number(
    {
      required_error: 'Obbligatorio',
      invalid_type_error: 'Valore numerico inserito non valido.',
    }).nonnegative().nullable(),

    daysToFirstPayment: z.number(
    {
      required_error: 'Obbligatorio',
      invalid_type_error: 'Valore numerico inserito non valido.',
    }).nonnegative(),

    movePaymentsToTheEndOfMonth: z.coerce.boolean(),

    numberOfPayments: z.number(
    {
      required_error: 'Obbligatorio',
      invalid_type_error: 'Valore numerico inserito non valido.',
    }).nonnegative(),
  });

export default schema;