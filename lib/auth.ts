import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const saveTokenToCookies = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set('__items_app__', `Bearer ${token}`, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  })
}

export const deleteCookies = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('__items_app__')
}

export const getCookies = cache(async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('__items_app__')
  if (!cookie) {
    redirect('/auth/signin')
  }
  return cookie
})

export const getCurrentUser = cache(async () => {
  const cookie = await getCookies()
  const verifiedJwt = await jwtVerify(
    cookie.value.slice(7),
    new TextEncoder().encode(process.env.SECRET_KEY)
  )
  return verifiedJwt.payload.sub
})
