import { z } from 'zod';

import { numericString } from '../zod';

export const searchSchema = z.object({
  q: z.string({ required_error: '검색어를 입력해주세요.' }),
  page: numericString(z.number()).optional(),
  limit: numericString(z.number()).optional(),
});

export const searchFormSchema = z.object({
  search: z.string({ required_error: '검색어를 입력해주세요.' }),
});
