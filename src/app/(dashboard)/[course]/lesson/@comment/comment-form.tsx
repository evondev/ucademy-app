'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { createComment } from '@/modules/comment/services/comment.actions';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { Textarea } from '@/shared/components/ui/textarea';
import { CommentItem } from '@/types';

const formSchema = z.object({
  content: z
    .string({
      message: 'Comment must be a string',
    })
    .min(10, { message: 'Comment must be at least 10 character long' }),
});

interface CommentFormProps {
  userId: string;
  lessonId: string;
  comment?: CommentItem;
  isReply?: boolean;
  closeReply?: () => void;
}
const CommentForm = ({
  closeReply,
  comment,
  isReply,
  lessonId,
  userId,
}: CommentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const slug = useSearchParams().get('slug');
  const path = `${pathname}?slug=${slug}`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const hasComment = await createComment({
        content: values.content,
        lesson: lessonId,
        user: userId,
        level: comment && comment?.level >= 0 ? comment?.level + 1 : 0,
        parentId: comment?._id,
        path,
      });

      if (!hasComment) {
        toast.error('Failed to post comment');

        return;
      }
      toast.success('Comment posted successfully');
      form.setValue('content', '');
      closeReply?.();
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="off"
          className="relative flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Nhập bình luận..."
                    className={cn('min-h-[150px]', {
                      'bg-gray-50': isReply,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isLoading={isPending}
            type="submit"
            variant="primary"
            className={cn('ml-auto h-10 w-[140px] rounded-lg', {
              'w-24': isReply,
            })}
          >
            {isReply ? 'Trả lời' : 'Đăng bình luận'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CommentForm;