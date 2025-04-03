import SigninForm from '@/components/forms/SigninForm'
import Link from 'next/link'

const SigninPage = () => {
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl self-center">Sign in</p>
          <p className="text-black/50">
            Sign in to access your account and manage your items seamlessly.
          </p>
        </div>
        <SigninForm />
        <p className="text-black/50">
          {"Don't"} have an account?{' '}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SigninPage
