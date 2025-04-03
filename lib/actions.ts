'use server'

import { revalidatePath } from 'next/cache'
import {
  itemIdSchema,
  itemEntrySchema,
  signupEntrySchema,
  signinEntrySchema,
} from './schema'
import { ErrorApiResponse, SuccessSignupResponse } from './types'
import { redirect } from 'next/navigation'
import { deleteCookies, saveTokenToCookies } from './auth'

export const signup = async (
  formData: unknown
): Promise<ErrorApiResponse | SuccessSignupResponse> => {
  const result = signupEntrySchema.safeParse(formData)
  if (!result.success) {
    return {
      error: 'Invalid data',
    }
  }

  const res = await fetch('http://localhost:8000/signup', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      username: result.data.username,
      full_name: result.data.fullName,
      password: result.data.confirmPassword,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    return {
      error: data.detail,
    }
  }
  return {
    success: 'Sign up successful',
  }
}

export const signin = async (
  formData: unknown
): Promise<ErrorApiResponse | SuccessSignupResponse> => {
  const result = signinEntrySchema.safeParse(formData)
  if (!result.success) {
    return {
      error: 'Invalid data',
    }
  }
  const body = new URLSearchParams()
  body.append('username', result.data.username)
  body.append('password', result.data.password)

  const res = await fetch('http://localhost:8000/signin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const data = await res.json()
  if (!res.ok) {
    return {
      error: data.detail,
    }
  }
  await saveTokenToCookies(data.access_token)
  return {
    success: 'You have logged in successfully',
  }
}

export const signout = async () => {
  await deleteCookies()
  redirect('/')
}
export const updateItem = async (
  formData: unknown,
  id: unknown
): Promise<ErrorApiResponse | undefined> => {
  const itemResult = itemEntrySchema.safeParse(formData)
  const idResult = itemIdSchema.safeParse(id)

  if (!itemResult.success || !idResult.success) {
    return {
      error: 'Invalid data',
    }
  }

  const res = await fetch(`http://localhost:8000/api/items/${id}`, {
    method: 'PUT',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdXN0aW5lenhjMSIsImlkIjoyLCJleHAiOjE3NDYyNzYwMjJ9.Afi_fjRsAskgAVwSkHPnMmonXQjN57dkv8HrudRKocQ',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemResult.data),
  })
  if (!res.ok) {
    return { error: 'Failed to fetch Item' }
  }
  revalidatePath('/items/[id]', 'page')
}

export const addItem = async (
  formData: unknown
): Promise<ErrorApiResponse | undefined> => {
  const result = itemEntrySchema.safeParse(formData)

  if (!result.success) {
    return {
      error: 'Invalid data',
    }
  }

  const res = await fetch(`http://localhost:8000/api/items`, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdXN0aW5lenhjMSIsImlkIjoyLCJleHAiOjE3NDYyNzYwMjJ9.Afi_fjRsAskgAVwSkHPnMmonXQjN57dkv8HrudRKocQ',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result.data),
  })
  if (!res.ok) {
    return { error: 'Failed to fetch Item' }
  }
  revalidatePath('/', 'page')
}

export const deleteItem = async (
  id: unknown
): Promise<ErrorApiResponse | undefined> => {
  const result = itemIdSchema.safeParse(id)
  if (!result.success) {
    return {
      error: 'Invalid data',
    }
  }
  const res = await fetch(`http://localhost:8000/api/items/${result.data}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdXN0aW5lenhjMSIsImlkIjoyLCJleHAiOjE3NDYyNzYwMjJ9.Afi_fjRsAskgAVwSkHPnMmonXQjN57dkv8HrudRKocQ',
    },
    body: JSON.stringify(result.data),
  })
  if (!res.ok) {
    return { error: 'Failed to fetch Item' }
  }
  revalidatePath('/', 'page')
  redirect('/')
}
