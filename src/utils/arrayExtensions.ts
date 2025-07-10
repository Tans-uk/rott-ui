/* eslint-disable no-extend-native */

const alphabet = 'AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz0123456789'

const customCompare = (a: string, b: string): number => {
  const indexA = alphabet.indexOf(a)
  const indexB = alphabet.indexOf(b)

  if (indexA === -1 || indexB === -1) {
    // Özel alfabede herhangi bir karakter bulunamazsa, varsayılan karşılaştırmayı kullanın
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

  // Daha kısa dizenin uzunluğuna kadar tüm karakterler eşitse, uzunlukları karşılaştırın
  return a.length - b.length
}

Array.prototype.sortByKey = function (key: string, orderBy: 'asc' | 'desc' = 'asc') {
  const sortedArray = this.sort((a: any, b: any) => sortAlphabetical(a[key], b[key]))

  return orderBy === 'desc' ? sortedArray.reverse() : sortedArray
}

Array.prototype.isEmpty = function () {
  return this?.length === 0
}

Array.prototype.hasItems = function () {
  return this?.length > 0
}

export {}
