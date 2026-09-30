import {defineHiddenMethod} from './defineHiddenMethod'

const alphabet = 'AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789'

const customCompare = (a: string, b: string): number => {
  const indexA = alphabet.indexOf(a)
  const indexB = alphabet.indexOf(b)

  if (indexA === -1 || indexB === -1) {
    // Fall back to the default comparison when a character is absent from the custom alphabet
    return a.localeCompare(b, 'tr', {sensitivity: 'base'})
  }

  return indexA - indexB
}

const sortAlphabetical = (a: string, b: string): number => {
  const minLength = Math.min(a.length, b.length)

  for (let i = 0; i < minLength; i++) {
    const comparison = customCompare(a[i]!, b[i]!)
    if (comparison !== 0) return comparison
  }

  // All characters equal up to the shorter string, so compare lengths
  return a.length - b.length
}

defineHiddenMethod(
  Array.prototype,
  'sortByKey',
  function (this: any[], key: string, orderBy: 'asc' | 'desc' = 'asc') {
    const sortedArray = this.sort((a: any, b: any) => sortAlphabetical(a[key], b[key]))

    return orderBy === 'desc' ? sortedArray.reverse() : sortedArray
  }
)

defineHiddenMethod(Array.prototype, 'isEmpty', function (this: unknown[]) {
  return this?.length === 0
})

defineHiddenMethod(Array.prototype, 'hasItems', function (this: unknown[]) {
  return this?.length > 0
})
