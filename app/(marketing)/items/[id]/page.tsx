import ItemDetails from '@/components/ItemDetails'
import { fetchItem } from '@/lib/server-utils'
import { Suspense } from 'react'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const item = await fetchItem(+id)

  if ('error' in item) {
    return {
      title: 'Item Not Found',
      description: 'This item could not be found.',
    }
  }

  return {
    title: item.name,
    description: item.description,
  }
}

const ItemPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = +(await params).id

  return (
    <main className="h-full w-[calc(100vw-15%)] absolute top-0 right-0">
      <Suspense fallback="Loading..">
        <ItemDetails id={id} />
      </Suspense>
    </main>
  )
}

export default ItemPage
