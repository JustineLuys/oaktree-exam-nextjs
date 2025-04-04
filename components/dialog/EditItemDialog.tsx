'use client'

import { useState } from 'react'
import ItemForm from '../forms/ItemForm'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface EditItemDialog {
  name: string
  description: string
  price: number
  id: number
}
const EditItemDialog = ({ name, description, price, id }: EditItemDialog) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseDialog = () => {
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:scale-[1.10]">Edit item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {name}</DialogTitle>
          <DialogDescription>
            Make changes to your item here. Click save when {"you're"} done.
          </DialogDescription>
        </DialogHeader>
        <ItemForm
          action="edit"
          description={description}
          name={name}
          price={price}
          id={id}
          closeDialog={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditItemDialog
