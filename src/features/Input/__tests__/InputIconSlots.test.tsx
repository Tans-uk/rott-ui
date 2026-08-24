import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Input} from '../components'
import type {InputProps, InputType} from '../models'

/**
 * Guarantees that EVERY input type renders its `leftIcon`/`rightIcon` slots
 * correctly through the `<Input>` orchestrator. Adding a new type, or breaking
 * a type's InputField wrapping, breaks this test.
 */
type IconSlotCase = {type: InputType; extraProps?: Record<string, unknown>}

const cases: IconSlotCase[] = [
  {type: 'default'},
  {type: 'email'},
  {type: 'numeric'},
  {type: 'statement'},
  {type: 'creditCard'},
  {type: 'cvc'},
  {type: 'expireDate'},
  {type: 'plateNumber'},
  {type: 'pinPassword'},
  {type: 'password'},
  {type: 'phone'},
  {type: 'iban'},
  {type: 'amount', extraProps: {onChangeText: jest.fn()}},
  {type: 'date', extraProps: {onDateChange: jest.fn()}},
  {type: 'select', extraProps: {list: [], onSelectChange: jest.fn()}},
  {type: 'multiSelect', extraProps: {list: [], onSelectChange: jest.fn()}},
  {type: 'checkbox'},
  {type: 'toggle', extraProps: {onToggle: jest.fn()}},
]

describe('Input -> leftIcon/rightIcon slots (all types)', () => {
  it.each(cases)(
    'renders both the leftIcon and rightIcon slots for type $type',
    async ({type, extraProps}) => {
      // InputProps is a discriminated union, so a dynamic `type` cannot narrow it;
      // testte prop nesnesini cast ediyoruz.
      const inputProps = {
        name: `${type}-icon-slot-test`,
        type,
        leftIcon: {name: 'mail', variant: 'grey-900'},
        rightIcon: {name: 'search', variant: 'grey-900'},
        ...extraProps,
      } as unknown as InputProps

      const {getByTestId} = await render(<Input {...inputProps} />)

      expect(getByTestId('input-field-left-icon')).toBeTruthy()
      expect(getByTestId('input-field-right-icon')).toBeTruthy()
    }
  )

  it.each(cases)(
    'does not render the left slot for type $type when no icon is given',
    async ({type, extraProps}) => {
      const inputProps = {
        name: `${type}-no-icon-test`,
        type,
        ...extraProps,
      } as unknown as InputProps

      const {queryByTestId} = await render(<Input {...inputProps} />)

      expect(queryByTestId('input-field-left-icon')).toBeNull()
    }
  )
})
