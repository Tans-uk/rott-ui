import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {Input} from '../components'
import type {InputProps, InputType} from '../models'

/**
 * Regresyon: `onChangeText` verilmeden metin girildiğinde input tipleri
 * çökmemelidir. Daha önce bileşenler `onChangeText!(...)` (non-null assertion)
 * kullandığı için prop verilmediğinde runtime'da patlıyordu.
 */
const placeholderTypes: InputType[] = [
  'default',
  'email',
  'numeric',
  'statement',
  'creditCard',
  'cvc',
  'expireDate',
  'plateNumber',
  'pinPassword',
  'phone',
  'iban',
  'password',
]

describe('Input -> onChangeText verilmeden çökmemeli (regresyon)', () => {
  it.each(placeholderTypes)(
    '%s tipinde onChangeText yokken metin girişi hata fırlatmaz',
    async (type) => {
      const placeholder = `${type}-guard-ph`
      const inputProps = {
        name: `${type}-guard`,
        type,
        placeholder,
      } as unknown as InputProps

      const {getByPlaceholderText} = await render(<Input {...inputProps} />)

      expect(() =>
        fireEvent.changeText(getByPlaceholderText(placeholder), '12345')
      ).not.toThrow()
    }
  )

  it('amount tipinde onChangeText yokken mount ve giriş çökmez', async () => {
    const inputProps = {name: 'amount-guard', type: 'amount'} as unknown as InputProps

    const {getByTestId} = await render(<Input {...inputProps} />)

    expect(() => fireEvent.changeText(getByTestId('amount-test-id'), '12')).not.toThrow()
  })
})
