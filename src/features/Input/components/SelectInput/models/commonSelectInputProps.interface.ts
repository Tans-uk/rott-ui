import type {ReactNode, Ref} from 'react'

import {Size} from '../../../../../models'
import type {EmptyStateProps} from '../../../../EmptyState/models'
import type {BaseInputProps} from '../../../models'
import type {SelectProps} from './selectProps.interface'

import type {FlashListProps} from '@shopify/flash-list'

/** TODO: BasInputProps'tan herhangi bir property omit edilmemelidir.
 * An exception. `value` comes from TextInput, a React Native core component, but a
 * Select is not anatomically a TextInput taking user input. Changing that would touch
 * too much of the project, so BaseInputProps is kept for now with `value` omitted.
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
