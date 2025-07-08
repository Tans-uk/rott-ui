import {HEADER_HEIGHT, LIST_BOTTOM_MARGIN} from '../constants'
import {listHeightNormalizer} from './listHeightNormalizer'

import {display} from '@utils'

/**
 * Modal Yuksekligini Eleman Sayisina Gore Yuzde (%) Olarak Hesaplar
 * @param itemCount eleman sayisi
 * @returns Modal Yukseklik Yuzdesi
 */
export const modalHeightPercentageNormalizer = (
  itemCount: number,
  searchable: boolean,
  showDescription: boolean,
  itemHeight: number = 56
) => {
  const listHeight = listHeightNormalizer(itemCount, showDescription, itemHeight)

  const modalHeightPX = display.normalize(
    listHeight + HEADER_HEIGHT(searchable) + LIST_BOTTOM_MARGIN,
    'height'
  )

  return (modalHeightPX * 100) / display.percentage(100, 'height') + 1
}
