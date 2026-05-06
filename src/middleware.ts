import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // Redirect www to non-www
  if (host === 'www.altabaq.com') {
    url.host = 'altabaq.com';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Match all request paths except for the ones starting with:
// - api (API routes)
// - _next/static (static files)
// - _next/image (image optimization files)
// - favicon.ico (favicon file)
// - logo.png (logo file)
// - assets (public assets)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|Menu.pdf|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)',
  ],
};
