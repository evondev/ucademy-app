'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getCourseLessonsInfo } from '@/lib/actions/course.actions';
import { commonClassNames } from '@/shared/constants';
import { StudyCoursesProps } from '@/types';
import { formatMinutesToHour, formatNumberToK } from '@/utils';

import { IconClock, IconEye, IconStar } from '../../shared/components/icons';

const CourseItem = ({
  cta,
  data,
  url = '',
}: {
  data: StudyCoursesProps;
  cta?: string;
  url?: string;
}) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function getDuration() {
      const res = await getCourseLessonsInfo({ slug: data.slug });

      setDuration(res?.duration || 0);
    }
    getDuration();
  }, [data.slug]);
  const courseInfo = [
    {
      title: formatNumberToK(data.views),
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: 5,
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: formatMinutesToHour(duration),
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];
  const courseUrl = url ? url : `/course/${data.slug}`;

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-opacity-10 dark:bg-grayDarker">
      <Link
        className="relative block h-[180px]"
        href={courseUrl}
      >
        <Image
          priority
          alt=""
          className="size-full rounded-lg object-cover"
          height={200}
          sizes="@media (min-width: 640px) 300px, 100vw"
          src={data.image}
          width={300}
        />
        {/* <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span> */}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="mb-3 text-lg font-bold">{data.title}</h3>
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500 dark:text-grayDark">
            {courseInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                {item.icon('size-4')}
                <span>{item.title}</span>
              </div>
            ))}

            <span className="ml-auto text-base font-bold text-primary">
              {data.price.toLocaleString()}đ
            </span>
          </div>

          <Link
            className={commonClassNames.btnPrimary}
            href={courseUrl}
          >
            {cta || 'Xem chi tiết'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
