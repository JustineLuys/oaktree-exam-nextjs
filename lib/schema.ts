import { z } from 'zod'

const minMessage = `must be at least 6 characters.`

export const signinEntrySchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: 'Username is required' })
    .min(6, { message: `Username ${minMessage}` }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(6, { message: `password must be at least 8 characters` }),
})

export const signupEntrySchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: 'Username is required' })
      .min(6, { message: `Username ${minMessage}` })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Username can only contain letters and numbers',
      }),
    fullName: z
      .string()
      .trim()
      .min(1, { message: 'Full name is required' })
      .min(6, { message: `Full name ${minMessage}` })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Full name can only contain letters and spaces',
      }),
    password: z
      .string()
      .trim()
      .min(1, { message: 'Password is required' })
      .min(8, { message: `Password must be at least 8 characters` }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: 'Confirm password is required' })
      .min(8, { message: `Confirm password must be at least 8 characters` }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const itemEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(6, { message: `Item name ${minMessage}` }),
  description: z.string().trim().max(100, {
    message: 'Description is too long. Please keep it within 100 characters.',
  }),
  price: z.number().nonnegative({ message: 'Price must be a positive number' }),
})

export const itemIdSchema = z.number()

export const itemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  owner_id: z.number(),
  id: z.number(),
})

export const apiResponseItemsSchema = z.object({
  data: z.array(itemSchema),
})
export const apiResponseItemSchema = z.object({
  data: itemSchema,
})
