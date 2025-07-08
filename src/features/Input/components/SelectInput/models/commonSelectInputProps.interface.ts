import type {ReactNode, Ref} from 'react'

import type {SelectProps} from './selectProps.interface'

import type {EmptyStateProps} from '@features/EmptyState'
import type {BaseInputProps} from '@features/Input/models'
import type {Size} from '@models'
import type {FlashListProps} from '@shopify/flash-list'

/** TODO: BasInputProps'tan herhangi bir property omit edilmemelidir.
 * Burası istisnai bir durumdur. value RN core componenti olan TextInput'tan gelmektedir.
 * Select bileşeni anatomik olarak kullanıcı girdisi alan bir TexTInput'tan oluşmaz.
 * Projede çok fazla yeri etkilediğinden şimdilik BaseInputProps kullanılmış ve value değeri omit edilmiştir.
 */
export interface CommonSelectInputProps extends Omit<BaseInputProps, 'value' | 'defaultValue'> {
  emptyState?: EmptyStateProps
  onTouched?: () => void
  sortByName?: boolean
  list?: SelectProps[]
  listRef?: Ref<any>
  onViewableItemsChanged?: FlashListProps<any>['onViewableItemsChanged']
  extraDisplayData?: Nullable<SelectProps[]>
  modalId?: number
  descriptionFontSize?: Size
  showSelected?: boolean
  searchable?: boolean
  showDescription?: boolean
  description?: string | boolean | ReactNode
  bottomSeparator?: boolean
  topSeparator?: boolean
}
