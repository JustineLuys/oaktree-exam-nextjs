import React from 'react'

const PageItemsListSkeleton = () => {
  return (
    <ul className="flex flex-wrap gap-12 content-start justify-center h-[80vh] w-full py-5 overflow-y-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-[220px] w-[220px] bg-black/20 rounded-xl animate-pulse"
        />
      ))}
    </ul>
  )
}

export default PageItemsListSkeleton
