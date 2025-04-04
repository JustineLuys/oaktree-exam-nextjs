import { Item } from '@/lib/types'
import Link from 'next/link'

const ItemsListItem = ({ item }: { item: Item }) => {
  const { id, name, description, price } = item

  return (
    <li
      key={id}
      className="border border-black/20 shadow-xl h-[220px] w-[220px] p-2 rounded-xl hover:scale-[1.10] transition-transform duration-400 ease-in-out"
    >
      <Link
        href={`/items/${id}`}
        className="h-full flex flex-col items-center justify-center relative gap-2 text-center"
      >
        <p className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </p>
        <p className="max-w-[90%] max-h-[3rem] overflow-hidden text-ellipsis">
          {description}
        </p>
        <p>${price}</p>
      </Link>
    </li>
  )
}

export default ItemsListItem
