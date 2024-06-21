import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";

const page = async () => {
  const courses = await getAllCourses();
  return (
    <CourseManage
      courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
    ></CourseManage>
  );
};

export default page;
