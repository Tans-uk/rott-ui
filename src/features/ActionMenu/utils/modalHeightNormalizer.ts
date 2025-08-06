import {useDisplay} from '../../../hooks'

export const modalHeightNormalizer = (
  dataLength: number,
  titleExist: boolean,
  subTitleExist: boolean,
  separatorTotalHeight: number,
  maxItem: number,
  itemHeight: number
) => {
  const {px, setHeight} = useDisplay()

  const showItemCount = dataLength > maxItem ? maxItem : dataLength
  const headerHeight = px(56)
  const cancelButtonHeight = px(56)
  const cancelButtonMarginTop = px(16)
  const listBottomPosition = px(24)

  return (
    ((showItemCount * itemHeight +
      (titleExist || subTitleExist ? headerHeight : 0) +
      cancelButtonHeight +
      cancelButtonMarginTop +
      listBottomPosition +
      separatorTotalHeight) *
      100) /
    setHeight(100)
  )
}
