import React from 'react'

const SidebarItemsSkeleton = () => {
  return (
    <ul className="h-[50%] flex flex-col gap-3 overflow-y-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-[5rem] bg-black/20 rounded-xl animate-pulse"
        />
      ))}
    </ul>
  )
}

export default SidebarItemsSkeleton
