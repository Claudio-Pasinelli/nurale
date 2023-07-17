/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Risorsa troppo corta' })
    .max(15, { message: 'Risorsa troppo lunga' }),
  typeOfPaymentId: z
    .number({
      required_error: 'Obbligatorio',
      invalid_type_error: 'Tipo di pagamento non valido.',
    })
    .nonnegative(),
  note: z
    .string()
    .min(0, { message: 'Nota troppo corta' })
    .max(300, { message: 'Nota troppo lunga' }),
});

export default schema;
