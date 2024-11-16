import { z } from 'zod';

export const CourseCommentFormSchema = z.object({
  content: z
    .string({
      message: 'Comment must be a string',
    })
    .min(10, { message: 'Comment must be at least 10 character long' }),
});
