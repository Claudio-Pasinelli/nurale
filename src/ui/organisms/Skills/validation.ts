import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(4, { message: 'skills.validation.nome.corto' })
    .max(15, { message: 'skills.validation.nome.lungo' }),
  skillType: z
    .string()
    .min(4, { message: 'skills.validation.tipo-di-skill.lungo' })
    .max(20, { message: 'skills.validation.tipo-di-skill.lungo' }),
  note: z
    .string()
    .min(4, { message: 'skills.validation.note.corto' })
    .max(300, { message: 'skills.validation.note.lungo' }),
});

export default schema;
