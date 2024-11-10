import { auth } from '@clerk/nextjs/server';

import CourseAddNew from '@/components/course/course-add-new';
import { getUserInfo } from '@/lib/actions/user.actions';
import { Heading } from '@/shared/components';

const page = async () => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });

  if (!mongoUser) return null;

  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))} />
    </>
  );
};

export default page;
