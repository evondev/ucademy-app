import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import PageNotFound from '@/app/not-found';
import { getUserInfo } from '@/lib/actions/user.actions';
import { UserRole } from '@/types/enums';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return redirect('/sign-in');
  const user = await getUserInfo({ userId });

  if (user && user.role !== UserRole.ADMIN) return <PageNotFound />;

  return <div>{children}</div>;
};

export default AdminLayout;
