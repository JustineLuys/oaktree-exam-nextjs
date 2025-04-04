'use client'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { signupEntrySchema } from '@/lib/schema'
import { SignupEntry } from '@/lib/types'
import { signup } from '@/lib/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useGetTransition } from '@/lib/hooks'

const SignupForm = () => {
  const { pending, startTransition } = useGetTransition()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupEntry>({ resolver: zodResolver(signupEntrySchema) })

  const onSubmit = (formData: SignupEntry) => {
    startTransition(async () => {
      const result = await signup(formData)
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      toast.success(result.success)
      router.push('/auth/signin')
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border border-black/20 rounded-xl p-10 w-[22rem] flex-col gap-5"
    >
      <div className="space-y-2">
        <Label htmlFor="username">Username: </Label>
        <Input
          id="username"
          type="text"
          {...register('username')}
          disabled={pending}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name: </Label>
        <Input
          id="fullName"
          type="text"
          {...register('fullName')}
          disabled={pending}
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs italic">
            {errors.fullName.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password: </Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          disabled={pending}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password: </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          disabled={pending}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button className="cursor-pointer" disabled={pending}>
        {pending ? 'Signing up...' : 'Sign up'}
      </Button>
    </form>
  )
}

export default SignupForm
