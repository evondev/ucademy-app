"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/actions/comment.actions";
import { ICommentItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
const formSchema = z.object({
  content: z
    .string({
      message: "Comment must be a string",
    })
    .min(10, { message: "Comment must be at least 10 character long" }),
});
interface CommentFormProps {
  userId: string;
  lessonId: string;
  comment?: ICommentItem;
}
const CommentForm = ({ userId, lessonId, comment }: CommentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const newComment = await createComment({
        content: values.content,
        lesson: lessonId,
        user: userId,
        level: comment && comment?.level >= 0 ? comment?.level + 1 : 0,
        parentId: comment?._id,
      });
      if (!newComment) {
        toast.error("Failed to post comment");
        return;
      }
      toast.success("Comment posted successfully");
      form.setValue("content", "");
    });
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter your comment..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isLoading={isPending}
            variant="primary"
            className="w-[140px] ml-auto"
            type="submit"
          >
            Post comment
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CommentForm;
