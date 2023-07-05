import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(4, { message: 'Risorsa troppo corta' })
    .max(15, { message: 'Risorsa troppo lunga' }),
  skillType: z
    .string()
    .min(4, { message: 'Tipo di skill troppo corto' })
    .max(20, { message: 'Tipo di skill troppo lungo' }),
  note: z
    .string()
    .min(4, { message: 'Nota troppo corta' })
    .max(300, { message: 'Nota troppo lunga' }),
});

export default schema;
