import {useDisplay} from '../../../../../hooks'
import {HEADER_HEIGHT, LIST_BOTTOM_MARGIN} from '../constants'
import {listHeightNormalizer} from './listHeightNormalizer'

/**
 * Modal Yuksekligini Eleman Sayisina Gore Yuzde (%) Olarak Hesaplar
 * @param itemCount eleman sayisi
 * @returns Modal Yukseklik Yuzdesi
 */
export const useModalHeightPercentageNormalizer = (
  itemCount: number,
  searchable: boolean,
  showDescription: boolean,
  itemHeight: number = 56
) => {
  const {normalize, percentage} = useDisplay()
  const listHeight = listHeightNormalizer(itemCount, showDescription, itemHeight)

  const modalHeightPX = normalize(
    listHeight + HEADER_HEIGHT(searchable) + LIST_BOTTOM_MARGIN,
    'height'
  )

  return (modalHeightPX * 100) / percentage(100, 'height') + 1
}
