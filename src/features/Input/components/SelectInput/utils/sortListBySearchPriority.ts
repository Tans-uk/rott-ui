import {searchTextNormalizer, searchTextWithTRNormalizer} from '../../../../../utils'
import type {SelectProps} from '../models'

export const sortListBySearchPriority = (list: SelectProps[], searchText: string) => {
  const normalizedSearchText = searchTextNormalizer(searchText)
  const normalizedSearchTextWithTR = searchTextWithTRNormalizer(searchText)

  return list.sort((a, b) => {
    const normalizedLabelA = searchTextWithTRNormalizer(a?.label || '')
    const normalizedLabelB = searchTextWithTRNormalizer(b?.label || '')

    // Scores how closely a text matches the search term; higher is a better match.
    const getMatchPriority = (text: string) => {
      const textSearchWithoutTR = searchTextNormalizer(text)

      // Normalise once, so the work is not repeated per comparison
      const isExactMatchWithTR = text === normalizedSearchTextWithTR
      const isExactMatch = textSearchWithoutTR === normalizedSearchText
      const isStartsWithTR = text.startsWith(normalizedSearchTextWithTR)
      const isStartsWith = textSearchWithoutTR.startsWith(normalizedSearchText)
      const isIncludes = text.includes(normalizedSearchText)

      // Score by match kind, strongest first
      // Prefix match scores highest
      if (isStartsWithTR) return 5
      // Exact match
      else if (isExactMatch) return 4
      // Exact match, Turkish-normalised
      else if (isExactMatchWithTR) return 3
      // Prefix match
      else if (isStartsWith) return 2
      // Substring match
      else if (isIncludes) return 1
      // No match scores zero
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
