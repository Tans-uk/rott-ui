import type {SelectProps} from '../models'

import {searchTextNormalizer, searchTextWithTRNormalizer} from '@utils'

export const sortListBySearchPriority = (list: SelectProps[], searchText: string) => {
  const normalizedSearchText = searchTextNormalizer(searchText)
  const normalizedSearchTextWithTR = searchTextWithTRNormalizer(searchText)

  return list.sort((a, b) => {
    const normalizedLabelA = searchTextWithTRNormalizer(a?.label || '')
    const normalizedLabelB = searchTextWithTRNormalizer(b?.label || '')

    // getMatchPriority fonksiyonu, bir metnin arama metniyle olan ilişkisini belirler ve öncelik puanı döndürür.
    const getMatchPriority = (text: string) => {
      const textSearchWithoutTR = searchTextNormalizer(text)

      // Metni normalize ederek tekrar eden işlemleri önler
      const isExactMatchWithTR = text === normalizedSearchTextWithTR
      const isExactMatch = textSearchWithoutTR === normalizedSearchText
      const isStartsWithTR = text.startsWith(normalizedSearchTextWithTR)
      const isStartsWith = textSearchWithoutTR.startsWith(normalizedSearchText)
      const isIncludes = text.includes(normalizedSearchText)

      // Koşullara göre öncelik puanı döndürür
      // Başlangıç eşleşmesi için en yüksek öncelik
      if (isStartsWithTR) return 5
      // Tam eşleşme
      else if (isExactMatch) return 4
      // Tam eşleşme (TR)
      else if (isExactMatchWithTR) return 3
      // Başlangıç eşleşmesi
      else if (isStartsWith) return 2
      // İçerik eşleşmesi
      else if (isIncludes) return 1
      // Eşleşme yoksa öncelik sıfır
      else return 0
    }

    const priorityA = getMatchPriority(normalizedLabelA)
    const priorityB = getMatchPriority(normalizedLabelB)

    // If priorities differ, sort by priority
    if (priorityA !== priorityB) return priorityB - priorityA

    // If priorities are the same, sort alphabetically
    return normalizedLabelA.localeCompare(normalizedLabelB)
  })
}
