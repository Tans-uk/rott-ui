import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {Input} from '../components'
import type {InputProps, InputType} from '../models'

/**
 * Regression: typing into an input without `onChangeText` must not crash.
 * The components previously used `onChangeText!(...)` with a non-null assertion,
 * so leaving the prop out blew up at runtime.
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

describe('Input -> does not crash without onChangeText (regression)', () => {
  it.each(placeholderTypes)(
    'typing into a %s input without onChangeText does not throw',
    async (type) => {
      const placeholder = `${type}-guard-ph`
      const inputProps = {
        name: `${type}-guard`,
        type,
        placeholder,
      } as unknown as InputProps

      const {getByPlaceholderText} = await render(<Input {...inputProps} />)

      expect(() => fireEvent.changeText(getByPlaceholderText(placeholder), '12345')).not.toThrow()
    }
  )

  it('mounting and typing into an amount input without onChangeText does not crash', async () => {
    const inputProps = {name: 'amount-guard', type: 'amount'} as unknown as InputProps

    const {getByTestId} = await render(<Input {...inputProps} />)

    expect(() => fireEvent.changeText(getByTestId('amount-test-id'), '12')).not.toThrow()
  })
})
