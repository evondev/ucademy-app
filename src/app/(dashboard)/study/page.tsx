import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";

const page = () => {
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </>
  );
};

export default page;
