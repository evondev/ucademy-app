import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [String.raw`/((?!.*\..*|_next).*)`, '/', '/(api|trpc)(.*)'],
};
