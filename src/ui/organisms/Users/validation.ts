import { z } from 'zod';

const schema = z
  .object({
    email: z.coerce.string().email().min(5, { message: 'users.validation.email' }),
    risorsa: z.number().nonnegative().nullable(),
    nome: z
      .string()
      .min(3, { message: 'users.validation.nome.corto' })
      .max(15, { message: 'users.validation.nome.lungo' }),
    cognome: z
      .string()
      .min(3, { message: 'users.validation.cognome.corto' })
      .max(15, { message: 'users.validation.cognome.lungo' }),
    password: z.string().min(8, { message: 'users.validation.password.corta' }),
    passwordConfirm: z.string().min(8, { message: 'users.validation.passwordConfirm.corta' }),
    phone: z
      .string()
      .min(10, { message: 'users.validation.phone.corto' })
      .max(15, { message: 'users.validationphone.lungo' })
      .optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Le password non corrispondono',
  });

export default schema;
