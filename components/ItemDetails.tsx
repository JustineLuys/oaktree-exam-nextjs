import { fetchItem } from '@/lib/server-utils'
import React from 'react'
import EditItemDialog from './dialog/EditItemDialog'
import DeleteItemDialog from './dialog/DeleteItemDialog'

const ItemDetails = async ({ id }: { id: number }) => {
  const item = await fetchItem(id)
  if ('error' in item) {
    return <div>Error: {item.error}</div>
  }
  const { name, description, price } = item
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{price}</p>
      <EditItemDialog
        name={name}
        description={description}
        price={price}
        id={id}
      />
      <DeleteItemDialog name={name} id={id} />
    </div>
  )
}

export default ItemDetails
