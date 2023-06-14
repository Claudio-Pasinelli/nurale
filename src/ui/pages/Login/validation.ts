import { z } from 'zod';

const schema = z.object({
    email: z.coerce.string().email().min(5, { message: 'Email non valida' }),
    password: z.string().min(5, { message: 'Password troppo corta' }).max(15, { message: 'Password troppo lunga' })
  });

export default schema;