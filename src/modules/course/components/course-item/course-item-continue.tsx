import Image from 'next/image';
import Link from 'next/link';

import { CourseItemData } from '@/shared/types';

interface CourseItemContinueProps {
  data: CourseItemData;
  cta?: string;
  url?: string;
}
export const CourseItemContinue = ({
  cta = 'Xem chi tiết',
  data,
  url = '',
}: CourseItemContinueProps) => {
  const courseUrl = url || `/course/${data.slug}`;

  return (
    <div className="borderDarkMode bgDarkMode flex rounded-2xl">
      <Link
        className="relative block aspect-square h-[140px]"
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
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-bold">{data.title}</h3>
        <Link
          className="button-primary ml-auto flex h-10 w-max items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white"
          href={courseUrl}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
};
