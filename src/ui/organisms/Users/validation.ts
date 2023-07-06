import { z } from 'zod';

const schema = z
  .object({
    email: z.coerce.string().email().min(5, { message: 'Email non valida' }),
    risorsa: z
      .string()
      .min(8, { message: 'Risorsa troppo corta' })
      .max(25, { message: 'Risorsa troppo lunga' }),
    nome: z
      .string()
      .min(3, { message: 'Nome troppo corto' })
      .max(15, { message: 'Nome troppo lungo' }),
    cognome: z
      .string()
      .min(3, { message: 'Cognome troppo corto' })
      .max(15, { message: 'Cognome troppo lungo' }),
    password: z
      .string()
      .min(8, { message: 'Password troppo corta' })
      .max(15, { message: 'Password troppo lunga' }),
    passwordConfirm: z
      .string()
      .min(8, { message: 'Password troppo corta' })
      .max(15, { message: 'Password troppo lunga' }),
    phone: z
      .string()
      .min(10, { message: 'Numero di telefono troppo corto' })
      .max(15, { message: 'Numero di telefono troppo lungo' })
      .optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Le password non corrispondono',
  });

export default schema;
