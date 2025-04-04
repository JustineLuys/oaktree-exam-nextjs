import 'server-only'
import { apiResponseItemSchema, apiResponseItemsSchema } from './schema'
import { ErrorApiResponse, Item } from './types'
import { getCookies } from './auth'

export const API_BASE_URL = process.env.API_BASE_URL

export const fetchItem = async (
  id: number
): Promise<ErrorApiResponse | Item> => {
  const cookie = await getCookies()
  const res = await fetch(`${API_BASE_URL}/api/items/${id}`, {
    headers: {
      Authorization: cookie.value,
    },
  })

  const data = await res.json()
  if (!res.ok) {
    return { error: data.detail }
  }
  const result = apiResponseItemSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid data format received' }
  }

  return result.data.data
}

export const fetchItems = async (): Promise<ErrorApiResponse | Item[]> => {
  const cookie = await getCookies()
  const res = await fetch(`${API_BASE_URL}/api/items`, {
    headers: {
      Authorization: cookie.value,
    },
  })

  const data = await res.json()
  if (!res.ok) {
    return { error: data.detail }
  }
  const result = apiResponseItemsSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid data format received' }
  }

  return result.data.data
}
