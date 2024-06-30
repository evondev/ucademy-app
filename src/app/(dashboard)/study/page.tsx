import Heading from "@/components/common/Heading";
import { getUserCourses } from "@/lib/actions/user.actions";
import StudyCourses from "./StudyCourses";

const page = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourses
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></StudyCourses>
    </>
  );
};

export default page;
