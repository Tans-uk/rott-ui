/** The shape AmountInput emits through onChangeText: integer digits, a dot, one or two decimals. */
const EMITTED_AMOUNT = /^(\d+)\.(\d{1,2})$/

/** Groups an integer's digits in threes with dots, the way the amount field displays them. */
export const groupThousands = (digits: string): string =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/**
 * Splits an AmountInput value into the display text of its two fields.
 *
 * Accepts the component's own output ("1234.50") and the Turkish-formatted input it has
 * always read ("1.234,50"), so mounting with a value the component emitted is stable.
 */
export const parseAmountValue = (value?: string | null): {amount: string; currency: string} => {
  if (!value) return {amount: '', currency: ''}

  const emitted = EMITTED_AMOUNT.exec(value)
  if (emitted) return {amount: groupThousands(emitted[1] ?? ''), currency: emitted[2] ?? ''}

  const [amount = '', currency = ''] = value.split(',')

  return {amount, currency}
}
