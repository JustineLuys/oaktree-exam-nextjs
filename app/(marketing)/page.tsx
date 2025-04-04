import AddItemDialog from '@/components/dialog/AddItemDialog'
import ItemsList from '@/components/list/ItemsList'
import PageItemsListSkeleton from '@/components/PageItemsListSkeleton'
import { Suspense } from 'react'
const HomePage = () => {
  return (
    <main className="h-full xl:w-[85%] w-full border pt-5 flex flex-col gap-10 items-center justify-around">
      <h1 className="text-3xl font-semibold mt-10">My Items List</h1>
      <AddItemDialog />
      <Suspense fallback={<PageItemsListSkeleton />}>
        <ItemsList />
      </Suspense>
    </main>
  )
}

export default HomePage
