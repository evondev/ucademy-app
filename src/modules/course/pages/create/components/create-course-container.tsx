'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';

import { createCourse } from '@/modules/course/actions';
import { courseCreateSchema } from '@/modules/course/schemas';
import { CourseCreateFormValues } from '@/modules/course/types';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/components/ui';
import { useUserContext } from '@/shared/contexts';

function CreateCourseContainer() {
  const { userInfo } = useUserContext();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CourseCreateFormValues>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  async function onSubmit(values: CourseCreateFormValues) {
    if (!userInfo) return;
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: 'vi',
          }),
        author: userInfo._id,
      };
      const response = await createCourse(data);

      if (!response?.success) {
        toast.error(response?.message);

        return;
      }
      toast.success('Tạo khóa học thành công');
      if (response?.data) {
        router.push(`/manage/course/update?slug=${response.data.slug}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tên khóa học"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input
                    placeholder="khoa-hoc-lap-trinh"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-[120px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          variant="primary"
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  );
}
export default CreateCourseContainer;
