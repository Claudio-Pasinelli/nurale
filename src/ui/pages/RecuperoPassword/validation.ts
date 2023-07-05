import { z } from 'zod';

const schema = z.object({
  email: z.coerce.string().email().min(5, { message: 'Email non valida' }),
});

export default schema;
