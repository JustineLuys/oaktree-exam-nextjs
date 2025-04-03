import ItemsListItem from './ItemsListItem'
import { fetchItems } from '@/lib/server-utils'

const EmptyItemsList = () => {
  return (
    <div className="h-[60vh] w-full flex items-start pt-32 justify-center">
      <p className="text-3xl">Empty items list... 🥺 Start by adding one?</p>
    </div>
  )
}
const ItemsList = async () => {
  const items = await fetchItems()
  if ('error' in items) {
    return <p>{items.error}</p>
  }
  if (items.length === 0) {
    return <EmptyItemsList />
  }
  return (
    <ul className="flex flex-wrap gap-12 content-start justify-center h-[80vh] w-full py-5 overflow-y-auto">
      {items.map((item) => (
        <ItemsListItem item={item} key={item.id} />
      ))}
    </ul>
  )
}

export default ItemsList
