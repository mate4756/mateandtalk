import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);
const isModuleRoute = createRouteMatcher(['/mate(.*)', '/futbol(.*)']);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
  
  // Module routes require authentication
  if (isModuleRoute(req)) {
    const userId = auth().userId;
    if (!userId) {
      // Redirect to sign-in if not authenticated
      return new Response('Redirect to sign-in', {
        status: 307,
        headers: { Location: '/sign-in' }
      });
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
