import { cookies } from 'next/headers'

export const saveTokenToCookies = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set('__items_app__', `Bearer ${token}`)
}

export const deleteCookies = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('__items_app__')
}
