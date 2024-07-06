import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) => {
  const courses = await getAllCourses({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search || "",
    status: searchParams.status || ECourseStatus.APPROVED,
  });
  return (
    <CourseManage
      courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
    ></CourseManage>
  );
};

export default page;
