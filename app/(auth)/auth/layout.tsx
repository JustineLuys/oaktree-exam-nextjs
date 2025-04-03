import React from 'react'
import { Toaster } from 'sonner'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="h-full">
      {children}
      <Toaster richColors={true} position="top-right" duration={3000} />
    </div>
  )
}

export default AuthLayout
