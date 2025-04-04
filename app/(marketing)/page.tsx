import AddItemDialog from '@/components/dialog/AddItemDialog'
import ItemsList from '@/components/list/ItemsList'
import PageItemsListSkeleton from '@/components/PageItemsListSkeleton'
import { Suspense } from 'react'
const HomePage = () => {
  return (
    <main className="h-full w-[calc(100vw-15%)] absolute top-0 pt-5 right-0 flex flex-col items-center justify-around">
      <h1 className="text-3xl font-semibold">My Items List</h1>
      <AddItemDialog />
      <Suspense fallback={<PageItemsListSkeleton />}>
        <ItemsList />
      </Suspense>
    </main>
  )
}

export default HomePage
