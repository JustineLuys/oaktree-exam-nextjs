import { fetchItems } from '@/lib/server-utils'
import Link from 'next/link'
import React from 'react'

const SidebarItems = async () => {
  const items = await fetchItems()
  if ('error' in items) {
    return <p>{items.error}</p>
  }

  const sidebarItemsList = items.map((item) => {
    const { id, name } = item
    return {
      id,
      name,
    }
  })

  return (
    <ul className="h-[50%] flex flex-col gap-3 overflow-y-auto">
      {sidebarItemsList.map((item) => (
        <li
          key={item.id}
          className="p-3 hover:bg-black/5 rounded-lg cursor-pointer"
          title={item.name}
        >
          <Link className="flex items-center gap-4" href={`/items/${item.id}`}>
            <p className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis">
              {item.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarItems
