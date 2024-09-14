import { getCommentsByLesson } from "@/lib/actions/comment.actions";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getLessonBySlug } from "@/lib/actions/lesson.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { ICommentItem } from "@/types";
import { formatDate, timeAgo } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
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
  const comments = await getCommentsByLesson(lesson?._id.toString() || "");
  const renderCommentItem = (comment: ICommentItem) => {
    return (
      <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-grayDarker shadow-sm border borderDarkMode">
        <div className="size-10 rounded-full border borderDarkMode shadow-sm flex-shrink-0">
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h4 className="font-bold">{comment.user.name}</h4>
            <span className="text-sm text-gray-400 font-medium">
              {timeAgo(comment.created_at)}
            </span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-gray-900 dark:text-white">
            {comment.content}
          </p>
          <div className="flex items-center gap-5 text-sm text-gray-400 font-medium">
            <span>{formatDate(comment.created_at)}</span>
            <span className="rounded-full size-1 bg-gray-300"></span>
            <button type="button">Reply</button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <CommentForm
        lessonId={lesson?._id.toString() || ""}
        userId={findUser?._id.toString() || ""}
      ></CommentForm>
      {comments && comments?.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <h2 className="text-2xl font-bold">Comments</h2>
          <div className="flex flex-col gap-5">
            {comments?.map(renderCommentItem)}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
