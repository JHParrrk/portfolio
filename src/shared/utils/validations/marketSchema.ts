import { z } from 'zod';

export const getMarketSchema = ({ isEdit }: { isEdit?: boolean } = {}) =>
  z.object({
    name: z.string().min(1, '상품명을 입력해주세요'),

    remarks: z.string().min(1, '한줄요약을 입력해주세요'),

    contents: z
      .string()
      .min(1, '내용을 입력해주세요')
      .refine(
        (value) => (value?.replace(/<[^>]+>/g, '').trim() || '') !== '',
        '내용을 입력해주세요.'
      ),

    price: z.preprocess(
      (val) => Number(val),
      z.number().min(0, '가격은 0원 이상이어야 합니다')
    ),

    tags: z.string().nullable().optional().default(''), // Users can type comma separated tags and we'll process it

    zipcode: z.string().nullable().optional().default(''),
    address: z.string().nullable().optional().default(''),
    addressDetail: z.string().nullable().optional().default(''),

    images: z
      .array(z.string().nullable().optional())
      .max(3, '이미지는 3장까지 등록 가능합니다')
      .default(['', '', ''])
      .optional(),
  });

export type IMarketFormData = z.infer<ReturnType<typeof getMarketSchema>>;
