import { getUserCourses } from "@/lib/actions/user.actions";
import { Heading } from "@/shared/components";
import { auth } from "@clerk/nextjs/server";
import StudyCourses from "./StudyCourses";

const page = async () => {
  const { userId } = auth();
  const courses = await getUserCourses(userId || "");
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
