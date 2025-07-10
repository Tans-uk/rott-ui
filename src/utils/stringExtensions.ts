/* eslint-disable no-extend-native */

String.prototype.isEmpty = function () {
  const isUndefined = this === undefined
  if (isUndefined) return true

  return this?.length === 0 || !this?.trim()
}

String.prototype.toSeoFriendly = function () {
  return this.toString() // Convert to string
    .normalize('NFD') // Change diacritics
    .replace(/Ğ/g, 'g') // Change TR Character
    .replace(/ğ/g, 'g') // Change TR Character
    .replace(/Ş/g, 's') // Change TR Character
    .replace(/ş/g, 's') // Change TR Character
    .replace(/İ/g, 'i') // Change TR Character
    .replace(/ı/g, 'i') // Change TR Character
    .replace(/I/g, 'i') // Change TR Character
    .replace(/Ç/g, 'c') // Change TR Character
    .replace(/ç/g, 'c') // Change TR Character
    .replace(/Ö/g, 'o') // Change TR Character
    .replace(/ö/g, 'o') // Change TR Character
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, '')
}

String.prototype.toBalance = function () {
  const balance = this.replace(/\b(TL|USD|GBP|EURO)\b/g, '')
    .trim()
    .replaceAll('.', '')
    .replace(',', '.')

  return parseFloat(balance)
}
String.prototype.toPascalCase = function () {
  return this.trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('tr')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

String.prototype.toMaskName = function (maskCharacter: string = '*'): string {
  return this.trim()
    .split(/\s+/) // Birden fazla boşluğu temizler
    .map((word) => {
      if (word.length <= 2) return word // Kelime 2 karakterden kısa ise olduğu gibi bırak

      return word[0]! + word[1]! + maskCharacter.repeat(word.length - 2)
    })
    .join(' ')
}

String.prototype.toMaskIban = function (maskCharacter: string = '*'): string {
  const iban = this.trim().replace(/\s+/g, '') // Boşlukları temizle

  const start = iban.slice(0, 4) // İlk 4 karakter
  const end = iban.slice(-4) // Son 4 karakter
  const maskedSection = iban.slice(4, -4).replace(/./g, maskCharacter) // Ortadaki kısmı maskele

  // Maskelenmiş IBAN'ı birleştir
  const maskedIban = start + maskedSection + end

  // Her 4 karakterde bir boşluk ekleyerek formatla
  return maskedIban.replace(/(.{4})(?=.)/g, '$1 ')
}

export {}
