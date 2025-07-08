import {ITEM_HEIGHT, LIST_MAX_ITEM_COUNT, LIST_MIN_ITEM_COUNT, SEPARATOR_HEIGHT} from '../constants'

/**
 * Liste Yuksekligini Tanimlanan Min-Max Item Degerlerine Gore Hesaplar.
 * @param itemCount eleman sayisi
 * @returns liste yuksekligi
 */
export const listHeightNormalizer = (
  itemCount: number,
  showDescription: boolean,
  itemHeight: number = 56
) => {
  if (itemCount < LIST_MIN_ITEM_COUNT) {
    return (
      ITEM_HEIGHT(showDescription, itemHeight) * LIST_MIN_ITEM_COUNT +
      SEPARATOR_HEIGHT * (LIST_MIN_ITEM_COUNT + 1)
    )
  } else if (itemCount >= LIST_MAX_ITEM_COUNT) {
    return (
      ITEM_HEIGHT(showDescription, itemHeight) * LIST_MAX_ITEM_COUNT +
      SEPARATOR_HEIGHT * (LIST_MAX_ITEM_COUNT + 1)
    )
  } else
    return ITEM_HEIGHT(showDescription, itemHeight) * itemCount + SEPARATOR_HEIGHT * (itemCount + 1)
}
