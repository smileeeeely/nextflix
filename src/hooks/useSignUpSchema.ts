import { z } from 'zod';

export const useSignUpSchema = z.object({
  email: z.string().email({ message: '이메일 형식에 맞지 않습니다.' }),
  password: z.string().min(6, { message: '6자리 이상 입력하세요' }),
  nickname: z
    .string()
    .min(3, { message: '닉네임은 3글자 이상이어야 합니다.' })
    .max(8, { message: '닉네임은 8글자 이하여야 합니다.' }),
});
