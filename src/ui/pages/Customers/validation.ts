/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(4, { message: 'Risorsa troppo corta' })
    .max(15, { message: 'Risorsa troppo lunga' }),
  typeOfPaymentId: z
    .number({
      required_error: 'Obbligatorio',
      invalid_type_error: 'Valore numerico inserito non valido.',
    })
    .nonnegative(),
  note: z
    .string()
    .min(4, { message: 'Nota troppo corta' })
    .max(300, { message: 'Nota troppo lunga' }),
});

export default schema;
