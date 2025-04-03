import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Toaster } from 'sonner'

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="h-full relative">
      <Sidebar />
      {children}
      <Toaster richColors={true} position="top-right" duration={3000} />
    </div>
  )
}

export default HomeLayout
