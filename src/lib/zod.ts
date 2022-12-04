import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseInt(a, 10);
    }
    if (typeof a === 'number') {
      return a;
    }
    return undefined;
  }, schema);
