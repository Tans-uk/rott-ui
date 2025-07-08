const defaultListItemHeight = 56
const defaultListItemHeightWithDescription = 69
export const ITEM_HEIGHT = (showDescription?: boolean, itemHeight?: number) =>
  itemHeight ?? (showDescription ? defaultListItemHeightWithDescription : defaultListItemHeight)
export const LIST_MAX_ITEM_COUNT = 8
export const LIST_MIN_ITEM_COUNT = 2
export const LIST_BOTTOM_MARGIN = 40
export const HEADER_HEIGHT = (searchable: boolean) => (searchable ? 152 : 112)
export const SEPARATOR_HEIGHT = 1
