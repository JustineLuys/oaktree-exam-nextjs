import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemEntrySchema } from '@/lib/schema'
import { ItemEntry } from '@/lib/types'
import { addItem, updateItem } from '@/lib/actions'
import { toast } from 'sonner'
import { useGetTransition } from '@/lib/hooks'

interface ItemFormProps {
  action: 'edit' | 'add'
  description?: string
  name?: string
  price?: number
  id?: number
  closeDialog: () => void
}
const ItemForm = ({
  action,
  id,
  description,
  name,
  price,
  closeDialog,
}: ItemFormProps) => {
  const { pending, startTransition } = useGetTransition()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ItemEntry>({
    resolver: zodResolver(itemEntrySchema),
    defaultValues: {
      description: action === 'edit' ? description : undefined,
      name: action === 'edit' ? name : undefined,
      price: action === 'edit' ? price : undefined,
    },
  })

  const onSubmit = (formData: ItemEntry) => {
    startTransition(async () => {
      const result =
        action === 'edit'
          ? await updateItem(formData, id)
          : await addItem(formData)
      if (result?.error) {
        toast.error(result?.error)
        return
      }
      setTimeout(
        () =>
          toast.success(
            `The item has been ${action === 'edit' ? 'edited' : 'added'}`
          ),
        2000
      )

      closeDialog()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="space-y-2">
        <Label htmlFor="name">Name: </Label>
        <Input id="name" type="text" {...register('name')} />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description: </Label>
        <Input id="description" type="text" {...register('description')} />
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price: </Label>
        <Input
          id="price"
          type="number"
          {...register('price', {
            valueAsNumber: true,
          })}
        />
        {errors.price && (
          <p className="text-red-500 text-xs italic">{errors.price.message}</p>
        )}
      </div>
      <Button disabled={pending}>
        {action === 'add'
          ? pending
            ? 'Adding item...'
            : 'Add item'
          : pending
          ? 'Saving changes...'
          : 'Save changes'}
      </Button>
    </form>
  )
}

export default ItemForm
