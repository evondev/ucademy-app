import { z } from 'zod';

export const courseCommentFormSchema = z.object({
  content: z
    .string({
      message: 'Comment must be a string',
    })
    .min(10, { message: 'Comment must be at least 10 character long' }),
});

export const courseCreateSchema = z.object({
  title: z.string().min(10, 'Tên khóa học phải có ít nhất 10 ký tự'),
  slug: z.string().optional(),
});
