import SignupForm from '@/components/forms/SignupForm'
import Link from 'next/link'

const SignupPage = () => {
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl self-center">Sign up</p>
          <p className="text-black/50">
            Please fill in this form to create an account
          </p>
        </div>
        <SignupForm />
        <p className="text-black/50">
          Already have an account?{' '}
          <Link href="/auth/signin" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignupPage
