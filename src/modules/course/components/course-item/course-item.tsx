import Image from 'next/image';
import Link from 'next/link';

import { IconEye, IconStar } from '@/shared/components/icons';
import { formatNumberToK } from '@/shared/helpers';
import { CourseItemData } from '@/shared/types';

import CourseItemDuration from './course-item-duration';

interface CourseItemProps {
  data: CourseItemData;
  cta?: string;
  url?: string;
}
const CourseItem = ({
  cta = 'Xem chi tiết',
  data,
  url = '',
}: CourseItemProps) => {
  const courseUrl = url || `/course/${data.slug}`;
  const courseInfo = [
    {
      title: formatNumberToK(data.views),
      icon: <IconEye className="size-4" />,
    },
    {
      title: 5,
      icon: <IconStar className="size-4" />,
    },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-200/10 dark:bg-grayDarker">
      <Link
        className="relative block h-[180px]"
        href={courseUrl}
      >
        <Image
          priority
          alt={data.title}
          className="size-full rounded-lg object-cover"
          height={200}
          sizes="@media (min-width: 640px) 300px, 100vw"
          src={data.image}
          width={300}
        />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="mb-3 text-lg font-bold">{data.title}</h3>
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500 dark:text-grayDark">
            {courseInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
            <CourseItemDuration slug={data.slug} />

            <span className="ml-auto text-base font-bold text-primary">
              {data.price.toLocaleString()}đ
            </span>
          </div>

          <Link
            className="button-primary mt-10 flex h-12 w-full items-center justify-center rounded-lg bg-primary font-bold text-white"
            href={courseUrl}
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
