import React from 'react'

import {render} from '../../__tests__/utils/testUtils'
import {Label} from '../../features/Label'
import {RottProvider} from '../../providers'
import {colorFromVariant} from '../colorFromVariant'

// The global providers mock swaps themeConfig for a static copy; this file needs the live one.
jest.unmock('../../providers')

describe('colorFromVariant', () => {
  it('resolves a color added through RottProvider config', async () => {
    const {getByTestId} = await render(
      <RottProvider config={{colors: {brand: '#123456'}}}>
        <Label testID='label' variant={'brand' as any} text='Brand' />
      </RottProvider>
    )

    expect(getByTestId('label')).toHaveStyle({color: '#123456'})
  })

  it('returns an unknown name unchanged, so literal colors pass through', () => {
    expect(colorFromVariant('#abcdef' as any)).toBe('#abcdef')
  })

  it('resolves a theme color', () => {
    expect(colorFromVariant('white')).toBe('rgba(255, 255, 255, 1)')
  })
})
