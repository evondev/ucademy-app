'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { updateCoupon } from '@/modules/coupon/actions';
import { couponCreateSchema } from '@/modules/coupon/schemas';
import { CouponCreateFormValues } from '@/modules/coupon/types';
import { fetchCourses } from '@/modules/course/actions';
import { IconClose } from '@/shared/components/icons';
import {
  Button,
  Calendar,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputFormatCurrency,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from '@/shared/components/ui';
import { CouponType, couponTypes } from '@/shared/constants';
import { CouponItemData, CourseItemData } from '@/shared/types';

export interface UpdateCouponContainerProps {
  couponDetails: CouponItemData;
}

const UpdateCouponContainer = ({
  couponDetails,
}: UpdateCouponContainerProps) => {
  const [findCourse, setFindCourse] = useState<CourseItemData[] | undefined>(
    [],
  );
  const [selectedCourses, setSelectedCourses] = useState<CourseItemData[]>([]);
  const [startDate, setStartDate] = useState<Date>(
    couponDetails.start_date || new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(
    couponDetails.end_date || new Date(),
  );
  const form = useForm<CouponCreateFormValues>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      title: couponDetails.title,
      code: couponDetails.code,
      active: couponDetails.active,
      value: couponDetails.value.toString(),
      limit: couponDetails.limit,
      type: couponDetails.type,
    },
  });

  useEffect(() => {
    if (couponDetails.courses) {
      setSelectedCourses(couponDetails.courses);
    }
  }, [couponDetails.courses]);

  async function onSubmit(values: CouponCreateFormValues) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ''));

      if (
        couponType === CouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError('value', {
          message: 'Giá trị không hợp lệ',
        });
      }
      const updatedCoupon = await updateCoupon({
        _id: couponDetails._id,
        updateData: {
          ...values,
          value: couponValue,
          start_date: startDate,
          end_date: endDate,
          courses: selectedCourses.map((course) => course._id.toString()),
        },
      });

      if (updatedCoupon.code) {
        toast.success('Cập nhật coupon thành công');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearchCourse = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const courseList = await fetchCourses({ search: value });

      setFindCourse(courseList);
      if (!value) setFindCourse([]);
    },
    250,
  );
  const handleSelectCourse = (
    checked: boolean | string,
    course: CourseItemData,
  ) => {
    if (checked) {
      setSelectedCourses((previous) => [...previous, course]);
    } else {
      setSelectedCourses((previous) =>
        previous.filter((selectedCourse) => selectedCourse._id !== course._id),
      );
    }
  };
  const couponTypeWatch = form.watch('type');

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
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tiêu đề"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mã giảm giá"
                    {...field}
                    disabled
                    className="font-bold uppercase"
                    onChange={(event) =>
                      field.onChange(event.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full"
                        variant={'outline'}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {startDate ? (
                          format(startDate, 'dd/MM/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={startDate}
                        onSelect={(day) => day && setStartDate(day)}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full"
                        variant={'outline'}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {endDate ? (
                          format(endDate, 'dd/MM/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={endDate}
                        onSelect={(day) => day && setEndDate(day)}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl className="h-12">
                  <RadioGroup
                    className="flex gap-5"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        key={type.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          id={type.value}
                          value={type.value}
                        />
                        <Label htmlFor={type.value}>{type.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <>
                    {couponTypeWatch === CouponType.PERCENT ? (
                      <Input
                        placeholder="100"
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    ) : (
                      <InputFormatCurrency
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl className="h-12">
                  <div className="flex flex-col justify-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100"
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={() => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Tìm kiếm khóa học..."
                      onChange={handleSearchCourse}
                    />
                    {!!findCourse && findCourse.length > 0 && (
                      <div className="!mt-5 flex flex-col gap-2">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.title}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              checked={selectedCourses.some(
                                (element) => element._id === course._id,
                              )}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(checked, course)
                              }
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="!mt-5 flex flex-wrap items-start gap-2">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="borderDarkMode bgDarkMode inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold"
                          >
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => handleSelectCourse(false, course)}
                            >
                              <IconClose className="size-5 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="ml-auto flex w-[150px]"
          variant="primary"
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCouponContainer;
