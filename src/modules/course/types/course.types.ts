import { z } from 'zod';

import { courseCommentFormSchema, courseCreateSchema } from '../schemas';

export interface LassLessonData {
  course: string;
  lesson: string;
}

export type CourseCommentFormValues = z.infer<typeof courseCommentFormSchema>;
export type CourseCreateFormValues = z.infer<typeof courseCreateSchema>;
