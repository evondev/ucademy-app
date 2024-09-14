import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getLessonBySlug } from "@/lib/actions/lesson.actions";
import CommentForm from "./CommentForm";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const lesson = await getLessonBySlug({
    slug: slug,
    course: findCourse?._id.toString(),
  });
  return (
    <div>
      <CommentForm></CommentForm>
      <div className="flex flex-col gap-5 mt-10">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-red-200 flex-shrink-0"></div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg">Evondev</h4>
              <p className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi aspernatur labore similique, totam suscipit delectus
                animi consequatur perspiciatis at beatae veritatis sequi fugiat
                dolorem repellendus, quod voluptate velit voluptas cupiditate.
              </p>
              <div className="flex items-center gap-5 text-sm text-gray-400 font-medium">
                <span>14/09/2023</span>
                <span className="rounded-full size-1 bg-gray-300"></span>
                <button type="button">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
