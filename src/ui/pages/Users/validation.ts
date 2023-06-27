import { z } from 'zod';

const schema = z.object({
    email: z.coerce.string().email().min(5, { message: 'Email non valida' }),
    risorsa: z.string().min(8, { message: 'Risorsa troppo corta' }).max(15, { message: 'Risorsa troppo lunga' }),
    nome: z.string().min(4, { message: 'Nome troppo corto' }).max(15, { message: 'Nome troppo corto' }),
    cognome: z.string().min(8, { message: 'Cognome troppo corto' }).max(15, { message: 'Cognome troppo corto' }),
    password: z.string().min(8, { message: 'Password troppo corta' }).max(15, { message: 'Password troppo lunga' }),
    confirmPwd: z.string().min(8, { message: 'Password troppo corta' }).max(15, { message: 'Password troppo lunga' }),
  });

export default schema;