import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Input} from '../components'
import type {InputProps, InputType} from '../models'

/**
 * Bu test, TÜM input tiplerinin `<Input>` orkestratörü üzerinden
 * `leftIcon`/`rightIcon` slotlarını doğru şekilde render ettiğini garanti eder.
 * Yeni bir tip eklendiğinde veya bir tipin InputField sarımı bozulduğunda
 * bu test kırılır.
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

describe('Input -> leftIcon/rightIcon slotları (tüm tipler)', () => {
  it.each(cases)(
    '$type tipi hem leftIcon hem rightIcon slotunu render eder',
    async ({type, extraProps}) => {
      // InputProps ayrımlı birleşim olduğu için dinamik `type` ile daraltılamaz;
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
    '$type tipi ikon verilmediğinde slot render etmez',
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
