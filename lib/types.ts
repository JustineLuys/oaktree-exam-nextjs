import { z } from 'zod'
import {
  itemSchema,
  itemEntrySchema,
  signupEntrySchema,
  signinEntrySchema,
} from './schema'

export type Item = z.infer<typeof itemSchema>
export type ItemEntry = z.infer<typeof itemEntrySchema>
export interface ErrorApiResponse {
  error: string
}
export interface SuccessSignupResponse {
  success: string
}

export interface SuccessSigninResponse {
  success: string
}
export type SignupEntry = z.infer<typeof signupEntrySchema>
export type SigninEntry = z.infer<typeof signinEntrySchema>
