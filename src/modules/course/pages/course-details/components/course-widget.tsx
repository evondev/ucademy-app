'use client';
import Link from 'next/link';
import { useState } from 'react';

import { IconPlay, IconStudy, IconUsers } from '@/shared/components/icons';
import { useUserContext } from '@/shared/contexts';
import { CourseItemData } from '@/shared/types';

import ButtonEnroll from './button-enroll';
import CouponForm from './coupon-form';

interface CourseWidgetProps {
  data: CourseItemData;
  duration: string;
}
const CourseWidget = ({ data, duration }: CourseWidgetProps) => {
  const [price, setPrice] = useState<number>(data.price);
  const [coupon, setCoupon] = useState('');
  const { userInfo } = useUserContext();

  const isAlreadyEnrolled = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo?.courses)).includes(data._id)
    : false;

  if (isAlreadyEnrolled)
    return (
      <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
        <Link
          className="flex h-12 w-full items-center justify-center rounded-lg bg-primary font-bold text-white"
          href="/study"
        >
          Khu vực học tập
        </Link>
      </div>
    );

  return (
    <>
      <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
        <div className="mb-3 flex items-center gap-2">
          <strong className="text-xl font-bold text-primary">
            {price.toLocaleString('en-EN')}
          </strong>
          <span className="text-sm text-slate-400 line-through">
            {data.sale_price.toLocaleString('en-EN')}
          </span>
          <span className="ml-auto inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {Math.floor((data.price / data.sale_price) * 100)}%
          </span>
        </div>
        <h3 className="mb-3 text-sm font-bold">Khóa học gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>{duration} học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUsers className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <ButtonEnroll
          amount={price}
          coupon={coupon}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
        />
        <CouponForm
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
          originalPrice={data.price}
          setCouponId={setCoupon}
          setPrice={setPrice}
        />
      </div>
    </>
  );
};

export default CourseWidget;
