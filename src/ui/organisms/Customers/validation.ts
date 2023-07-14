/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'customers.validation.nome.corto' })
    .max(15, { message: 'customers.validation.nome.lungo' }),
  typeOfPaymentId: z
    .number({
      required_error: 'customers.validation.tipo-di-pagamento.richiesto',
      invalid_type_error: 'customers.validation.tipo-di-pagamento.invalido',
    })
    .nonnegative(),
  note: z
    .string()
    .min(3, { message: 'customers.validation.note.corto' })
    .max(300, { message: 'customers.validation.note.lungo' }),
});

export default schema;
