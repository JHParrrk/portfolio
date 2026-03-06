import { z } from 'zod';

export const getBoardSchema = ({ isEdit }: { isEdit?: boolean } = {}) =>
  z.object({
    writer: z.string().min(2, '이름은 최소 2글자 이상입니다'),

    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        '비밀번호는 8자 이상, 영문+숫자 조합이어야 합니다'
      ),

    title: z.string().min(1, '제목을 입력해주세요'),

    contents: z
      .string()
      .min(1, '내용을 입력해주세요')
      .refine(
        (value) => (value?.replace(/<[^>]+>/g, '').trim() || '') !== '',
        '내용을 입력해주세요.'
      ),

    zipcode: z.string().nullable().optional().default(''),
    address: z.string().nullable().optional().default(''),
    addressDetail: z.string().nullable().optional().default(''),

    youtubeUrl: z
      .union([z.string().url('유효한 URL을 입력해주세요'), z.literal('')])
      .optional()
      .nullable(),

    images: z
      .array(z.string().nullable().optional())
      .max(3, '이미지는 3장까지 등록 가능합니다')
      .default(['', '', ''])
      .optional(),
  });

export type IFormData = z.infer<ReturnType<typeof getBoardSchema>>;
