import { getCommentsByLesson } from "@/lib/actions/comment.actions";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getLessonBySlug } from "@/lib/actions/lesson.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentSorting from "./CommentSorting";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
    sort: "recent" | "oldest";
  };
}) => {
  const { userId } = auth();
  const findUser = await getUserInfo({ userId: userId! });
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const lesson = await getLessonBySlug({
    slug: slug,
    course: findCourse?._id.toString(),
  });
  const comments = await getCommentsByLesson(
    lesson?._id.toString() || "",
    searchParams.sort
  );
  const commentLessonId = lesson?._id.toString() || "";
  const commentUserId = findUser?._id.toString() || "";
  const rootComments = comments?.filter((item) => !item.parentId);
  return (
    <div>
      <CommentForm
        lessonId={commentLessonId}
        userId={commentUserId}
      ></CommentForm>
      {rootComments && rootComments?.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>Comments</span>
              <span className="flex items-center justify-center bg-primary text-white text-sm font-semibold rounded-full py-0.5 px-4">
                {comments?.length}
              </span>
            </h2>
            <CommentSorting></CommentSorting>
          </div>
          <div className="flex flex-col gap-5">
            {rootComments?.map((item) => (
              <CommentItem
                key={item._id}
                comment={item}
                lessonId={commentLessonId}
                userId={commentUserId}
                comments={comments || []}
              ></CommentItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
