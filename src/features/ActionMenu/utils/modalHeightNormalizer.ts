import {display} from '@utils'

export const modalHeightNormalizer = (
  dataLength: number,
  titleExist: boolean,
  subTitleExist: boolean,
  separatorTotalHeight: number,
  maxItem: number,
  itemHeight: number
) => {
  const showItemCount = dataLength > maxItem ? maxItem : dataLength
  const headerHeight = display.px(56)
  const cancelButtonHeight = display.px(56)
  const cancelButtonMarginTop = display.px(16)
  const listBottomPosition = display.px(24)

  return (
    ((showItemCount * itemHeight +
      (titleExist || subTitleExist ? headerHeight : 0) +
      cancelButtonHeight +
      cancelButtonMarginTop +
      listBottomPosition +
      separatorTotalHeight) *
      100) /
    display.setHeight(100)
  )
}
