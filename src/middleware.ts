import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login?callbackUrl=/admin/dashboard', request.url))
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url))
    }
  }

  // Protect account routes
  if (pathname.startsWith('/account')) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url),
      )
    }
  }

  // Protect checkout
  if (pathname.startsWith('/checkout')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login?callbackUrl=/checkout', request.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (session && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/checkout/:path*',
    '/auth/login',
    '/auth/signup',
  ],
}
