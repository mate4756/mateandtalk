import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos que /success y la home son públicas
const isPublicRoute = createRouteMatcher(['/', '/success']);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};