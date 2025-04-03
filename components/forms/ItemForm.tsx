import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemEntrySchema } from '@/lib/schema'
import { ItemEntry } from '@/lib/types'
import { addItem, updateItem } from '@/lib/actions'
import { toast } from 'sonner'

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

  const onSubmit = async (formData: ItemEntry) => {
    const result =
      action === 'edit'
        ? await updateItem(formData, id)
        : await addItem(formData)
    if (result?.error) {
      toast.error(result?.error)
      return
    }
    toast.success(`The item has been ${action === 'edit' ? 'edited' : 'added'}`)
    closeDialog()
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
      <Button>{action === 'add' ? 'Add item' : 'Save changes'}</Button>
    </form>
  )
}

export default ItemForm
