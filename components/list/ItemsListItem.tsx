import { Item } from '@/lib/types'
import Link from 'next/link'

const ItemsListItem = ({ item }: { item: Item }) => {
  const { id, name, description, price } = item

  return (
    <li
      key={id}
      className="border h-[220px] w-[220px] rounded-xl hover:scale-[1.10] transition-transform duration-400 ease-in-out"
    >
      <Link
        href={`/items/${id}`}
        className="h-full flex flex-col items-center justify-center relative gap-2"
      >
        <p>{name}</p>
        <p>{description}</p>
        <p>${price}</p>
      </Link>
    </li>
  )
}

export default ItemsListItem
