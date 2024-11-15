import { auth } from '@clerk/nextjs/server';

import { getCourseBySlug } from '@/lib/actions/course.actions';
import { getUserInfo } from '@/lib/actions/user.actions';
import { getCommentsByLesson } from '@/modules/comment/services/comment.actions';
import { getLessonBySlug } from '@/modules/lesson/actions/lesson.actions';

import CommentField from './comment-field';
import CommentForm from './comment-form';
import CommentSorting from './comment-sorting';

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
    sort: 'recent' | 'oldest';
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
    lesson?._id.toString() || '',
    searchParams.sort,
  );
  const commentLessonId = lesson?._id.toString() || '';
  const commentUserId = findUser?._id.toString() || '';
  const rootComments = comments?.filter((item) => !item.parentId);

  return (
    <div>
      <CommentForm
        lessonId={commentLessonId}
        userId={commentUserId}
      />
      {!!rootComments && rootComments?.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span>Comments</span>
              <span className="flex items-center justify-center rounded-full bg-primary px-4 py-0.5 text-sm font-semibold text-white">
                {comments?.length}
              </span>
            </h2>
            <CommentSorting />
          </div>
          <div className="flex flex-col gap-5">
            {rootComments?.map((item) => (
              <CommentField
                key={item._id}
                comment={item}
                comments={comments || []}
                lessonId={commentLessonId}
                userId={commentUserId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
