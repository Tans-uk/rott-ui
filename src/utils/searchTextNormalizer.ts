/**
 *
 * @param text Duzeltilecek Arama Metni
 * @returns Bosluklari ve turkce karakterleri duzeltir. Metni Lowercase yapar.
 */
export const searchTextNormalizer = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, ' ')
    .replace(/i̇+/g, 'i')
    .replace(/ı+/g, 'i')
    .replace(/ö+/g, 'o')
    .replace(/ş+/g, 's')
    .replace(/ç+/g, 'c')
    .replace(/ğ+/g, 'g')
    .replace(/ü+/g, 'u')

export const searchTextWithTRNormalizer = (text: string) =>
  text.toLocaleLowerCase('tr').trim().replace(/\s\s+/g, ' ').replace(/i̇+/g, 'i')
