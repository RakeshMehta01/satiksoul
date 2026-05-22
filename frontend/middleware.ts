import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/shared-home(.*)',
  '/future-messages(.*)',
  '/relationship-settings(.*)',
  '/memories(.*)',
  '/assistant(.*)',
  '/qr(.*)',
  '/timeline(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|webmanifest)).*)', '/(api|trpc)(.*)'],
};
