import { z } from 'zod';

import { couponCreateSchema } from '../schemas';

export type CouponCreateFormValues = z.infer<typeof couponCreateSchema>;
