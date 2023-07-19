/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'suppliers.validation.nome.corto' })
    .max(15, { message: 'suppliers.validation.nome.lungo' }),
  typeOfPaymentId: z
    .number({
      required_error: 'suppliers.validation.tipo-di-pagamento.richiesto',
      invalid_type_error: 'suppliers.validation.tipo-di-pagamento.invalido',
    })
    .nonnegative(),
  note: z
    .string()
    .min(0, { message: 'suppliers.validation.note.corto' })
    .max(300, { message: 'suppliers.validation.nome.lungo' }),
});

export default schema;
