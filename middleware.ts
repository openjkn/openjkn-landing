import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Bypass static resources, assets, APIs, and uploads
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/uploads') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Retrieve locale from cookie
  let locale = request.cookies.get('NEXT_LOCALE')?.value

  // 3. If no cookie exists, detect via Geolocation or Browser Headers
  if (!locale) {
    const country = request.headers.get('x-vercel-ip-country') || ''
    
    if (country) {
      // IP Geolocation: If user is outside Indonesia (ID), default to English (en)
      locale = country.toUpperCase() === 'ID' ? 'id' : 'en'
      console.log(`Middleware GeoIP Detection: country is ${country}, setting locale to ${locale}`)
    } else {
      // Development Fallback: Inspect browser's accept-language
      const acceptLang = request.headers.get('accept-language') || ''
      if (acceptLang.toLowerCase().includes('en')) {
        locale = 'en'
      } else {
        locale = 'id'
      }
      console.log(`Middleware Accept-Language Detection: headers are ${acceptLang}, setting locale to ${locale}`)
    }
  }

  // 4. Proceed with response and persist choice in Cookie
  const response = NextResponse.next()
  
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax'
  })

  return response
}
