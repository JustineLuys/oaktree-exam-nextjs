import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { JWSInvalid } from 'jose/errors'

export const middleware = async (req: NextRequest) => {
  const cookieStore = await cookies()
  const appCookie = cookieStore.get('__items_app__')

  if (req.nextUrl.pathname === '/') {
    if (!appCookie || !appCookie.value.startsWith('Bearer ')) {
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl.origin))
    }

    try {
      const verifiedJwt = await jwtVerify(
        appCookie.value.slice(7),
        new TextEncoder().encode(process.env.SECRET_KEY)
      )
      if (!verifiedJwt) {
        return NextResponse.redirect(
          new URL('/auth/signin', req.nextUrl.origin)
        )
      } else {
        return NextResponse.next()
      }
    } catch (e) {
      if (e instanceof JWSInvalid) {
        return NextResponse.redirect(
          new URL('/auth/signin', req.nextUrl.origin)
        )
      }
    }
  }
  if (
    req.nextUrl.pathname === '/auth/signin' ||
    req.nextUrl.pathname === '/auth/signup'
  ) {
    if (!appCookie || !appCookie.value.startsWith('Bearer ')) {
      return NextResponse.next()
    } else {
      try {
        const verifiedJwt = await jwtVerify(
          appCookie.value.slice(7),
          new TextEncoder().encode(process.env.SECRET_KEY)
        )
        if (!verifiedJwt) {
          return NextResponse.next()
        } else {
          return NextResponse.redirect(new URL('/', req.nextUrl.origin))
        }
      } catch (e) {
        if (e instanceof JWSInvalid) {
          return NextResponse.next()
        }
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - fonts/Satoshi-Regular.otf (specific font file)
     * - muichiro.jpg (specific image file)
     * - *.png (all PNG files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|fonts/Satoshi-Regular.otf|muichiro.jpg|.*\\.png$).*)',
  ],
}
