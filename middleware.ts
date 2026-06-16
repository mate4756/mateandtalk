import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs';

// Definimos qué rutas son públicas
const isPublicRoute = createRouteMatcher(['/success', '/']);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // Si es pública, no hacemos nada
  auth().protect(); // Si no es pública, protegemos la ruta
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};