'use client'
import { signout } from '@/lib/actions'
import { Button } from '../ui/button'
import { FaSignOutAlt } from 'react-icons/fa'

const SignoutButton = () => {
  const handleSignout = async () => {
    await signout()
  }
  return (
    <Button
      onClick={handleSignout}
      className="bg-red-400 hover:bg-red-300 h-13 mt-auto mb-20 rounded-md cursor-pointer"
    >
      <span className="text-lg">Sign out </span>
      <FaSignOutAlt className="mt-0.5" />
    </Button>
  )
}

export default SignoutButton
