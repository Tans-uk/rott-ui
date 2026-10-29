/** A dot decimal: this input's own output ("1234.50") or an API amount ("1234.5000"). */
const DOT_DECIMAL = /^(\d+)\.(\d+)$/
/** Dots that group thousands, Turkish style: "1.234", "12.345.678". */
const DOT_GROUPED = /^\d{1,3}(?:\.\d{3})+$/
/** Commas that group thousands, with an optional dot decimal: "1,234.50". */
const COMMA_GROUPED = /^(\d{1,3}(?:,\d{3})+)(?:\.(\d+))?$/
/** The Turkish format: dots may group thousands, a comma may start the cents. */
const TURKISH = /^(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d*))?$/

/** Groups an integer's digits in threes with dots, the way the amount field displays them. */
export const groupThousands = (digits: string): string =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/** The two field texts: the grouped integer, and at most two decimals, cut rather than rounded. */
const toFields = (integer: string, decimals = '') => ({
  amount: groupThousands(integer.replace(/^0+(?=\d)/, '')),
  currency: decimals.slice(0, 2),
})

/**
 * Splits an AmountInput value into the display text of its two fields.
 *
 * Reads a dot decimal ("1234.50", "1234.5000"), the Turkish format ("1.234,50") and
 * comma-grouped thousands ("1,234.50"), ignoring surrounding spaces. Any other shape — a
 * sign, letters, mixed separators — leaves both fields empty instead of becoming another
 * amount.
 */
export const parseAmountValue = (value?: string | null): {amount: string; currency: string} => {
  const text = value?.trim() ?? ''

  const dotDecimal = DOT_DECIMAL.exec(text)
  if (dotDecimal && !DOT_GROUPED.test(text)) return toFields(dotDecimal[1] ?? '', dotDecimal[2])

  const commaGrouped = COMMA_GROUPED.exec(text)
  if (commaGrouped) return toFields((commaGrouped[1] ?? '').replace(/,/g, ''), commaGrouped[2])

  const turkish = TURKISH.exec(text)
  if (turkish) return toFields((turkish[1] ?? '').replace(/\./g, ''), turkish[2])

  return {amount: '', currency: ''}
}
