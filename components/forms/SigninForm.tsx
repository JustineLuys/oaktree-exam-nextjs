'use client'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { signinEntrySchema } from '@/lib/schema'
import { SigninEntry } from '@/lib/types'
import { signin } from '@/lib/actions'
import { toast } from 'sonner'
import { useGetTransition } from '@/lib/hooks'
import { useRouter } from 'next/navigation'

const SigninForm = () => {
  const router = useRouter()
  const { pending, startTransition } = useGetTransition()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninEntry>({ resolver: zodResolver(signinEntrySchema) })

  const onSubmit = (formData: SigninEntry) => {
    startTransition(async () => {
      const result = await signin(formData)
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      router.push('/')
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border border-black/20 rounded-xl w-[20rem] h-[20rem] flex-col items-center justify-center gap-6"
    >
      <div className="space-y-2 w-[80%]">
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
      <div className="space-y-2 w-[80%]">
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
      <Button className="cursor-pointer w-[80%]" disabled={pending}>
        {pending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}

export default SigninForm
