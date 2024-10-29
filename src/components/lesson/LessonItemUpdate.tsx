'use client';
import { LessonProps } from '@/database/lesson.model';
import { updateLesson } from '@/lib/actions/lesson.actions';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { editorOptions } from '@/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: LessonProps }) => {
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (editorRef.current) {
  //       editorRef.current.setContent(lesson.content);
  //     }
  //   }, 1000);
  // }, [lesson.content]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: values,
      });
      if (res?.success) {
        toast.success('Cập nhật bài học thành công');
      }
    } catch (error) {
      console.log(error);
    } finally {
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
            <div></div>
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
                      onInit={(_evt, editor) => {
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

export default LessonItemUpdate;
