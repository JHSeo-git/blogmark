import { z } from 'zod';

import { numericString } from '../zod';

export const itemSchema = z.object({
  url: z.string({ required_error: 'URL을 입력해주세요.' }).url('URL 형식에 맞게 작성해주세요.'),
  title: z
    .string({ required_error: '제목을 입력해주세요.' })
    .min(2, '2~40글자를 입력해주세요.')
    .max(40, '2~40글자를 입력해주세요.'),
});

export const likeItemSchema = z.object({
  itemId: numericString(z.number({ required_error: 'itemId를 입력해주세요.' })),
});
