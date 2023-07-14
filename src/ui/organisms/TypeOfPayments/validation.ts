/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'typeOfPayments.validation.nome.corto' })
    .max(15, { message: 'typeOfPayments.validation.nome.lungo' }),
  note: z
    .string()
    .min(0, { message: 'typeOfPayments.validation.note.corto' })
    .max(300, { message: 'typeOfPayments.validation.note.lungo' }),

  daysBetweenPayments: z
    .number({
      required_error: 'typeOfPayments.validation.giorni-tra-i-pagamenti.richiesto',
      invalid_type_error: 'typeOfPayments.validation.giorni-tra-i-pagamenti.invalido',
    })
    .nonnegative(),

  daysOffsetPayments: z
    .number({
      required_error: 'typeOfPayments.validation.giorni-scostamento-pagamento.richiesto',
      invalid_type_error: 'typeOfPayments.validation.giorni-scostamento-pagamento.invalido',
    })
    .nonnegative()
    .nullable(),

  daysToFirstPayment: z
    .number({
      required_error: 'typeOfPayments.validation.giorni-al-primo-pagamento.richiesto',
      invalid_type_error: 'typeOfPayments.validation.giorni-al-primo-pagamento.invalido',
    })
    .nonnegative(),

  movePaymentsToTheEndOfMonth: z.coerce.boolean(),

  numberOfPayments: z
    .number({
      required_error: 'typeOfPayments.validation.numero-di-pagamenti.richiesto',
      invalid_type_error: 'typeOfPayments.validation.numero-di-pagamenti.invalido',
    })
    .nonnegative(),
});

export default schema;
