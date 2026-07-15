import React from 'react'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {ToggleInput} from '../components'

describe('Toggle Input -> icon slots', () => {
  it('rightIcon switchten önce render edilir ve onPress toggle a sızmaz', async () => {
    const onToggle = jest.fn()
    const onIconPress = jest.fn()
    const {getByTestId} = await render(
      <ToggleInput
        name='t'
        label='Bildirim'
        onToggle={onToggle}
        rightIcon={{name: 'information', onPress: onIconPress}}
      />
    )
    fireEvent.press(getByTestId('input-field-right-icon'))
    expect(onIconPress).toHaveBeenCalledTimes(1)
    expect(onToggle).not.toHaveBeenCalled()
  })

  it('leftIcon render eder', async () => {
    const onToggle = jest.fn()
    const {getByTestId} = await render(
      <ToggleInput name='t' label='Bildirim' onToggle={onToggle} leftIcon={{name: 'lock'}} />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })
})
