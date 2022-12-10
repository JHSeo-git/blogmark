import { z } from 'zod';

export const userSchema = z.object({
  userName: z.string({ required_error: '이름을 입력해주세요.' }).min(2, '2~20글자를 입력해주세요.'),
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .email('이메일 형식에 맞게 작성해주세요.'),
});
