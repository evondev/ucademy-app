'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { updateLesson } from '@/modules/lesson/actions';
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
import { editorOptions } from '@/shared/constants';
import { LessonItemData } from '@/shared/types';

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

interface OutlineItemProps {
  lesson: LessonItemData;
}
const OutlineItem = ({ lesson }: OutlineItemProps) => {
  const editorRef = useRef<unknown>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateLesson({
        lessonId: lesson._id,
        updateData: values,
      });

      if (response?.success) {
        toast.success('Cập nhật bài học thành công');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const { theme } = useTheme();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="bai-1-tong-quan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời lượng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="bai-1-tong-quan"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/abcdefXZ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      value={field.value}
                      onInit={(_event, editor) => {
                        (editorRef.current = editor).setContent(
                          lesson.content || '',
                        );
                      }}
                      {...editorOptions(field, theme)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 flex items-center justify-end gap-5">
            <Button type="submit">Cập nhật</Button>
            <Link
              className="text-sm text-slate-600"
              href="/"
            >
              Xem trước
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OutlineItem;
