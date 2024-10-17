"use client";
import { getCourseLessonsInfo } from "@/lib/actions/course.actions";
import { commonClassNames } from "@/shared/constants";
import { StudyCoursesProps } from "@/types";
import { formatMinutesToHour, formatNumberToK } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClock, IconEye, IconStar } from "../../shared/components/icons";
const CourseItem = ({
  data,
  cta,
  url = "",
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
      icon: (className?: string) => <IconEye className={className}></IconEye>,
    },
    {
      title: 5,
      icon: (className?: string) => <IconStar className={className}></IconStar>,
    },
    {
      title: formatMinutesToHour(duration),
      icon: (className?: string) => (
        <IconClock className={className}></IconClock>
      ),
    },
  ];
  const courseUrl = url ? url : `/course/${data.slug}`;
  return (
    <div className="bg-white dark:bg-grayDarker dark:border-opacity-10 border border-gray-200 p-4 rounded-2xl flex flex-col">
      <Link href={courseUrl} className="block h-[180px] relative">
        <Image
          src={data.image}
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300px, 100vw"
          priority
        />
        {/* <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span> */}
      </Link>
      <div className="pt-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-3">{data.title}</h3>
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
            {courseInfo.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                {item.icon("size-4")}
                <span>{item.title}</span>
              </div>
            ))}

            <span className="font-bold text-primary ml-auto text-base">
              {data.price.toLocaleString()}đ
            </span>
          </div>

          <Link href={courseUrl} className={commonClassNames.btnPrimary}>
            {cta || "Xem chi tiết"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
