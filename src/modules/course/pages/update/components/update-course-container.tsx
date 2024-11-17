'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useImmer } from 'use-immer';
import { z } from 'zod';

import { updateCourse } from '@/modules/course/actions';
import { IconAdd } from '@/shared/components/icons';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/components/ui';
import {
  CourseLevel,
  courseLevel,
  CourseStatus,
  courseStatus,
} from '@/shared/constants';
import { CourseItemData } from '@/shared/types';
import { UploadButton } from '@/shared/utils/uploadthing';

const formSchema = z.object({
  title: z.string().min(10, 'Tên khóa học phải có ít nhất 10 ký tự'),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  sale_price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  views: z.number().int().optional(),
  status: z
    .enum([CourseStatus.APPROVED, CourseStatus.PENDING, CourseStatus.REJECTED])
    .optional(),
  level: z
    .enum([
      CourseLevel.BEGINNER,
      CourseLevel.INTERMEDIATE,
      CourseLevel.ADVANCED,
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

interface UpdateCourseContainerProps {
  course: CourseItemData;
}

const UpdateCourseContainer = ({ course }: UpdateCourseContainerProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: course.info.requirements,
    benefits: course.info.benefits,
    qa: course.info.qa,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      price: course.price,
      sale_price: course.sale_price,
      intro_url: course.intro_url,
      desc: course.desc,
      image: course.image,
      status: course.status,
      level: course.level,
      views: course.views,
      info: {
        requirements: course.info.requirements,
        benefits: course.info.benefits,
        qa: course.info.qa,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await updateCourse({
        slug: course.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          desc: values.desc,
          views: values.views,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
          status: values.status,
          level: values.level,
          image: values.image,
        },
      });

      if (values.slug !== course.slug) {
        router.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (response?.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  const imageWatch = form.watch('image');

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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="599.000"
                    type="number"
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
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    placeholder="999.000"
                    type="number"
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
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khóa học</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả..."
                    {...field}
                    className="h-[250px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <>
                    <div className="relative flex h-[250px] items-center justify-center rounded-md border border-gray-200 bg-white">
                      {imageWatch ? (
                        <Image
                          fill
                          alt=""
                          className="size-full rounded-md object-cover"
                          src={imageWatch}
                        />
                      ) : (
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(response) => {
                            // Do something with the response
                            form.setValue('image', response[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            console.error(`ERROR! ${error.message}`);
                          }}
                        />
                      )}
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/axfgdr5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1000"
                    type="number"
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                        >
                          {status.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.map((level) => (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                        >
                          {level.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.requirements"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Yêu cầu</span>
                  <button
                    className="text-primary"
                    type="button"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push('');
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirements.map((r, index) => (
                      <Input
                        key={index}
                        placeholder={`Yêu cầu số ${index + 1}`}
                        value={r}
                        onChange={(event) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = event.target.value;
                          });
                        }}
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.benefits"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Lợi ích</span>
                  <button
                    className="text-primary"
                    type="button"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push('');
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.benefits.map((r, index) => (
                      <Input
                        key={index}
                        placeholder={`Lợi ích số ${index + 1}`}
                        value={r}
                        onChange={(event) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = event.target.value;
                          });
                        }}
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.qa"
            render={() => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Q.A</span>
                  <button
                    className="text-primary"
                    type="button"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: '',
                          answer: '',
                        });
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-5"
                      >
                        <Input
                          key={index}
                          placeholder={`Câu hỏi số ${index + 1}`}
                          value={item.question}
                          onChange={(event) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].question = event.target.value;
                            });
                          }}
                        />
                        <Input
                          key={index}
                          placeholder={`Câu trả lời số ${index + 1}`}
                          value={item.answer}
                          onChange={(event) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].answer = event.target.value;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-[150px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          variant="primary"
        >
          Cập nhật khóa học
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCourseContainer;
