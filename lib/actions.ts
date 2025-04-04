'use server'

import { revalidatePath } from 'next/cache'
import {
  itemIdSchema,
  itemEntrySchema,
  signupEntrySchema,
  signinEntrySchema,
} from './schema'
import {
  ErrorApiResponse,
  SuccessSigninResponse,
  SuccessSignupResponse,
} from './types'
import { redirect } from 'next/navigation'
import { deleteCookies, getCookies, saveTokenToCookies } from './auth'
import { API_BASE_URL } from './server-utils'

export const signup = async (
  formData: unknown
): Promise<ErrorApiResponse | SuccessSignupResponse> => {
  try {
    const result = signupEntrySchema.safeParse(formData)
    if (!result.success) {
      return {
        error: 'Invalid data',
      }
    }

    const res = await fetch(`${API_BASE_URL}/signup`, {
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
        error: data.detail || 'Signup failed',
      }
    }
    return {
      success: 'Sign up successful',
    }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Network or server error occurred',
    }
  }
}

export const signin = async (
  formData: unknown
): Promise<ErrorApiResponse | SuccessSigninResponse> => {
  try {
    const result = signinEntrySchema.safeParse(formData)
    if (!result.success) {
      return {
        error: 'Invalid data',
      }
    }
    const body = new URLSearchParams()
    body.append('username', result.data.username)
    body.append('password', result.data.password)

    const res = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const data = await res
      .json()
      .catch(() => ({ detail: 'Failed to parse response' }))
    if (!res.ok) {
      return {
        error: data.detail || 'Authentication failed',
      }
    }
    await saveTokenToCookies(data.access_token)
    return { success: 'Sign in successful' }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Network or server error occurred',
    }
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
  try {
    const itemResult = itemEntrySchema.safeParse(formData)
    const idResult = itemIdSchema.safeParse(id)

    if (!itemResult.success || !idResult.success) {
      return {
        error: 'Invalid data',
      }
    }
    const cookies = await getCookies()

    const res = await fetch(`${API_BASE_URL}/api/items/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookies.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemResult.data),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return { error: errorData.detail || 'Failed to update item' }
    }

    revalidatePath('/items/[id]', 'page')
    return undefined
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Network or server error occurred',
    }
  }
}

export const addItem = async (
  formData: unknown
): Promise<ErrorApiResponse | undefined> => {
  try {
    const result = itemEntrySchema.safeParse(formData)

    if (!result.success) {
      return {
        error: 'Invalid data',
      }
    }

    const cookies = await getCookies()

    const res = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        Authorization: cookies.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return { error: errorData.detail || 'Failed to add item' }
    }

    revalidatePath('/', 'page')
    return undefined
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Network or server error occurred',
    }
  }
}

export const deleteItem = async (
  id: unknown
): Promise<ErrorApiResponse | undefined> => {
  try {
    const result = itemIdSchema.safeParse(id)
    if (!result.success) {
      return {
        error: 'Invalid data',
      }
    }
    const cookies = await getCookies()

    const res = await fetch(`${API_BASE_URL}/api/items/${result.data}`, {
      method: 'DELETE',
      headers: {
        Authorization: cookies.value,
      },
      body: JSON.stringify(result.data),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return { error: errorData.detail || 'Failed to delete item' }
    }

    revalidatePath('/', 'page')
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Network or server error occurred',
    }
  }
}
