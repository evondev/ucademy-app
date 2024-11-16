import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';

import PageNotFound from '@/app/not-found';
import { getUserInfo } from '@/modules/user/actions';

import LoadingOutline from './@outline/loading-outline';
import LoadingPlayer from './@player/loading-player';
import LessonWrapper from './lesson-wrapper';

interface LayoutProps {
  player: React.ReactNode;
  outline: React.ReactNode;
  comment: React.ReactNode;
}
const Layout = async ({ comment, outline, player }: LayoutProps) => {
  const { userId } = auth();

  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });

  if (!findUser) return <PageNotFound />;

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>
        <div>
          {player}
          {comment}
        </div>
      </Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  );
};

export default Layout;
