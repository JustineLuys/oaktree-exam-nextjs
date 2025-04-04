'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { deleteItem } from '@/lib/actions'
import { toast } from 'sonner'
import { useGetTransition } from '@/lib/hooks'
import { useRouter } from 'next/navigation'

interface DeleteItemDialogProps {
  id: number
  name: string
}
const DeleteItemDialog = ({ id, name }: DeleteItemDialogProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { pending, startTransition } = useGetTransition()
  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  const handleDeleteItem = () => {
    startTransition(async () => {
      const result = await deleteItem(id)
      if (result?.error) {
        toast.error(result.error)
        return
      }
      handleCloseDialog()
      toast.success('Item has been deleted')
      router.push('/')
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="cursor-pointer hover:scale-[1.10]"
        >
          Delete item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-5 p-6">
        <DialogHeader>
          <DialogTitle>Delete {name}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action is permanent
            and cannot be undone. Once you confirm, the item will be removed
            from your collection.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            onClick={() => handleCloseDialog()}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={handleDeleteItem}
            disabled={pending}
          >
            {pending ? 'Deleting item...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteItemDialog
