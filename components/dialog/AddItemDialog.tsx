'use client'

import { useState } from 'react'
import ItemForm from '../forms/ItemForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'

const AddItemDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseDialog = () => {
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add item ➕</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add item</DialogTitle>
          <DialogDescription>
            Fill in the details of the item {"you'd"} like to add. Once{' '}
            {"you're"} finished, click {`"Add item"`} to add it to your
            collection.
          </DialogDescription>
        </DialogHeader>
        <ItemForm action="add" closeDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  )
}

export default AddItemDialog
