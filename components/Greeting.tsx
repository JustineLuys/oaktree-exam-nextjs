import { getCurrentUser } from '@/lib/auth'

const Greeting = async () => {
  const username = await getCurrentUser()
  return <p className="ml-[1.25rem] mt-[3rem] text-3xl">Hello, {username}</p>
}

export default Greeting
