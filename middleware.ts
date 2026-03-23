import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/onboarding', '/assessment', '/skill-paths'];
const authRoutes = ['/login', '/register'];

// Mock rate limit store (in-memory for MVP, ideally replace with Upstash/Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Rate Limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    
    // Only rate limit specific costly endpoints like /api/recommend or /api/evaluate-project
    if (['/api/recommend', '/api/evaluate-project', '/api/generate-journey', '/api/generate-path'].includes(pathname)) {
      const currentTime = Date.now();
      const rateLimitData = rateLimitMap.get(ip) || { count: 0, lastReset: currentTime };

      if (currentTime - rateLimitData.lastReset > RATE_LIMIT_WINDOW_MS) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, lastReset: currentTime });
      } else {
        rateLimitData.count += 1;
        if (rateLimitData.count > MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Terlalu banyak permintaan (Rate limit exceeded). Coba lagi nanti.' },
            { status: 429 }
          );
        }
        rateLimitMap.set(ip, rateLimitData);
      }
    }
  }

  // 2. Auth Middleware
  // In Next.js + Firebase, verifying Firebase custom tokens in Edge Middleware is complex.
  // Instead, we just check if a known session cookie exists (if you implemented cookie auth),
  // or we leave hard verification to the client components/API routes.
  // For basic UX protection, we check for a 'SkillPathSession' cookie or similar MVP indicator.
  const hasSession = request.cookies.has('__session') || request.cookies.has('firebase-session');

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !hasSession) {
    // Basic redirect for unauthenticated users accessing protected UI routes
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && hasSession) {
    // Redirect authenticated users away from auth pages
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
