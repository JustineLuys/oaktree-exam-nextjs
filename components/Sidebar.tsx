import Link from 'next/link'
import SignoutButton from './buttons/SignoutButton'
import { FaHome } from 'react-icons/fa'
import SidebarItems from './SidebarItems'
import Greeting from './Greeting'
import { Suspense } from 'react'
import SidebarItemsSkeleton from './SidebarItemsSkeleton'

const Sidebar = () => {
  return (
    <aside className="w-[15%] h-full absolute top-0 left-0 border-r-black/10 border p-2">
      <nav className="h-full flex flex-col gap-6">
        <Greeting />
        <div className="p-5 pl-5 hover:bg-black/5 rounded-xl cursor-pointer">
          <Link className="flex items-center gap-4" href="/">
            <FaHome size={25} />
            <span className="text-2xl">Home</span>
          </Link>
        </div>
        <Suspense fallback={<SidebarItemsSkeleton />}>
          <SidebarItems />
        </Suspense>
        <SignoutButton />
      </nav>
    </aside>
  )
}

export default Sidebar
