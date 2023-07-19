/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  level: z.number().nonnegative().nullable(),
  note: z
    .string()
    .min(0, { message: 'skills.validation.note.corto' })
    .max(300, { message: 'skills.validation.note.lungo' }),
  resourceId: z.number().nonnegative().nullable(),
  skillId: z.number().nonnegative().nullable(),
});

export default schema;
