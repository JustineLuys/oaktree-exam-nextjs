import { fetchItem } from '@/lib/server-utils'
import React from 'react'
import EditItemDialog from './dialog/EditItemDialog'
import DeleteItemDialog from './dialog/DeleteItemDialog'

const ItemDetails = async ({ id }: { id: number }) => {
  const item = await fetchItem(id)
  if ('error' in item) {
    return <div className="text-2xl font-semibold">{item.error}</div>
  }
  const { name, description, price } = item
  return (
    <div className="border border-black/20 rounded-xl shadow-2xl h-[400px] w-[400px] flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-xl">{description}</p>
      <p className="text-lg text-black/50">${price}</p>
      <div className="space-x-4 mt-7">
        <DeleteItemDialog name={name} id={id} />
        <EditItemDialog
          name={name}
          description={description}
          price={price}
          id={id}
        />
      </div>
    </div>
  )
}

export default ItemDetails
