import {formatMessage, type TranslationLanguageTypes} from '../../../libs'

export const formatByDateMode = (
  mode: 'date' | 'time' | 'datetime' | 'modal-date' | 'modal-time' | 'modal-datetime',
  date: string
) => {
  switch (mode) {
    case 'time':
      // return formatTime(date)
      return date
    case 'date':
      // return formatDate(date)
      return date
    default:
      // return formatDateTime(date)
      return date
  }
}

// TODO: Genisletilecek - Refactor Edilecek
/**
 *
 * @param date YYYY.MM.DD formatinda tarih
 * @param mode donecek format tipi
 * @returns
 * mode: **'DD MM YYYY'** - ```{day: DD, month: MM, year: YYYY}```
 *
 * mode: **'DD MMMM YYYY'** - ```{day: DD, month: 'Month Text', year: YYYY}```
 */
export const dateFormatSlicer = (date: string, mode: 'DD MM YYYY' | 'DD MMMM YYYY') => {
  const dateArr = date.split('.') //YYYY.MM.DD

  if (dateArr.length === 3) {
    if (mode === 'DD MM YYYY') return {day: dateArr[2], month: dateArr[1], year: dateArr[0]}
    else {
      return {
        day: dateArr[2],
        month: formatMessage(`MONTH.${Number(dateArr[1])}` as TranslationLanguageTypes),
        year: dateArr[0],
      }
    }
  }

  return null
}

export const dateYearFormatter = (date: string) => {
  const transferDate = new Date(date)

  const formattedDate = `${transferDate.getDate().toString().padStart(2, '0')}.${(transferDate.getMonth() + 1).toString().padStart(2, '0')}.${transferDate.getFullYear()}`

  return formattedDate
}

/**
 * @param date DD / MM / YYYY formatinda tarih
 * @returns
 */
export const dateYearConfirmationFormatter = (date: string) => {
  const transferDate = new Date(date)

  const formattedDate = `${transferDate.getDate().toString().padStart(2, '0')} / ${(transferDate.getMonth() + 1).toString().padStart(2, '0')} / ${transferDate.getFullYear()}`

  return formattedDate
}

/**
 * Converts a YYYYMMDD date into DD MMM YYYY DayName form.
 * @param date A date in YYYYMMDD form
 * @returns The date in DD MMM YYYY DayName form
 */
export const dateFormatWithDayName = (date: string): string => {
  const year = parseInt(date.substring(0, 4), 10)
  const month = parseInt(date.substring(4, 6), 10) - 1 // Months are 0-11, so subtract one
  const day = parseInt(date.substring(6, 8), 10)

  const dateObj = new Date(year, month, day)

  const dayName = formatMessage(`DAY.${dateObj.getDay()}` as TranslationLanguageTypes)
  const monthName = formatMessage(`MONTH.${dateObj.getMonth() + 1}` as TranslationLanguageTypes)

  const formattedDate = `${day.toString().padStart(2, '0')} ${monthName} ${year} ${dayName}`

  return formattedDate
}
