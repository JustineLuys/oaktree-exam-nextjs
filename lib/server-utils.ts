import 'server-only'
import { apiResponseItemSchema, apiResponseItemsSchema } from './schema'
import { ErrorApiResponse, Item } from './types'

export const fetchItem = async (
  id: number
): Promise<ErrorApiResponse | Item> => {
  const res = await fetch(`http://localhost:8000/api/items/${id}`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdXN0aW5lenhjMSIsImlkIjoyLCJleHAiOjE3NDYyNzYwMjJ9.Afi_fjRsAskgAVwSkHPnMmonXQjN57dkv8HrudRKocQ',
    },
  })
  if (!res.ok) {
    return { error: 'Failed to fetch Item' }
  }

  const data: unknown = await res.json()
  const result = apiResponseItemSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid data format received' }
  }

  return result.data.data
}

export const fetchItems = async (): Promise<ErrorApiResponse | Item[]> => {
  const res = await fetch('http://localhost:8000/api/items', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdXN0aW5lenhjMSIsImlkIjoyLCJleHAiOjE3NDYyNzYwMjJ9.Afi_fjRsAskgAVwSkHPnMmonXQjN57dkv8HrudRKocQ',
    },
  })
  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`)
    return { error: 'Failed to fetch items' }
  }

  const data: unknown = await res.json()
  const result = apiResponseItemsSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid data format received' }
  }

  return result.data.data
}
