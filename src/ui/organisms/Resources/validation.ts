/* eslint-disable camelcase */
import { z } from 'zod';

const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'resources.validation.nome.corto' })
    .max(15, { message: 'resources.validation.nome.lungo' }),
  lastName: z
    .string()
    .min(3, { message: 'resources.validation.cognome.corto' })
    .max(15, { message: 'resources.validation.cognome.lungo' }),
  curriculumVitae: z.string(),
  note: z
    .string()
    .min(0, { message: 'skills.validation.note.corto' })
    .max(300, { message: 'skills.validation.note.lungo' }),
  hourCost: z.number().nonnegative(),
  dailyCost: z.number().nonnegative().nullable(),
  hourRevenue: z.number().nonnegative(),
  dailyRevenue: z.number().nonnegative().nullable(),
  supplierId: z.number().nonnegative(),
});

export default schema;
