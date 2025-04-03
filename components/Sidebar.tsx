import Link from 'next/link'
import SignoutButton from './buttons/SignoutButton'

const navs = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
  {
    name: 'Favorites',
    path: '/favorites',
  },
]
const Sidebar = () => {
  return (
    <aside className="w-[15%] h-full absolute top-0 left-0 border-r-black/10 border p-2">
      <nav className="h-full flex flex-col gap-10">
        <p className="ml-[1.25rem] mt-[1.25rem] text-3xl">Hello, anon</p>
        <ul className="h-[30%] flex flex-col gap-2">
          {navs.map((nav) => (
            <li
              key={nav.name}
              className="p-5 pl-10 hover:bg-black/5 rounded-xl cursor-pointer"
            >
              <Link className="flex" href={nav.path}>
                {' '}
                <span className="text-2xl">{nav.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <SignoutButton />
      </nav>
    </aside>
  )
}

export default Sidebar
