import { useTransition } from 'react'

export const useGetTransition = () => {
  const [pending, startTransition] = useTransition()
  return { pending, startTransition } as const
}
