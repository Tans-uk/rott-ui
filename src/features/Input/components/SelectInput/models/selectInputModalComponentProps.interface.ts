import type {SelectInputProps} from './selectInputProps.type'

export interface SelectInputModalComponentProps
  extends Pick<
    SelectInputProps,
    | 'searchable'
    | 'placeholder'
    | 'label'
    | 'showDescription'
    | 'showSelected'
    | 'list'
    | 'emptyState'
    | 'sortByName'
    | 'listRef'
    | 'onViewableItemsChanged'
    | 'name'
  > {
  selectedItemValue?: string | string[]
  handleConfirmPress: (item: Nullable<string>) => void
}
