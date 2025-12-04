import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // 1. Initialize response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Create Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Update request cookies so Server Components see the new session
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          
          // Re-create response to ensure cookies are persisted
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Set cookies on response
          cookiesToSet.forEach(({ name, value, options }) => 
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Refresh Session
  // This updates the cookie if it's expired. We wrap it to prevent crashes.
  try {
    await supabase.auth.getUser()
  } catch (e) {
    // If auth fails, we just continue as a logged-out user
    console.error("Middleware Auth Error:", e)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /images (public images)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}