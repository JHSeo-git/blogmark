import { z } from 'zod';

import { numericString } from '../zod';

export const paginationSchema = z.object({
  page: numericString(z.number().optional()),
  limit: numericString(z.number().optional()),
});

export const paginationByCursorSchema = z.object({
  cursor: numericString(z.number().optional()),
  limit: numericString(z.number().optional()),
});
