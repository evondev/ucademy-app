"use client";
import CourseItem from "@/components/course/CourseItem";
import { CourseGrid } from "@/shared/components";
import { lastLessonKey } from "@/shared/constants";
import { StudyCoursesProps } from "@/types";
import { useEffect, useState } from "react";

const StudyCourses = ({
  courses,
}: {
  courses: StudyCoursesProps[] | null | undefined;
}) => {
  const [lastLesson, setLastLesson] = useState<any[]>([]);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const data = localStorage
        ? JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || []
        : [];
      setLastLesson(data);
    }
  }, []);
  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses &&
        courses.length > 0 &&
        courses?.map((item) => {
          const url =
            lastLesson.find((el: any) => el.course === item.slug)?.lesson || "";
          const firstLessonUrl = item.lectures[0].lessons[0].slug;
          return (
            <CourseItem
              key={item.slug}
              cta="Tiếp tục học"
              data={item}
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
            ></CourseItem>
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourses;
