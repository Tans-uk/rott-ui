import React from 'react'

import {render} from '../../__tests__/utils/testUtils'
import {Icon} from '../../features'
import {RottProvider, themeConfig} from '../RottProvider'
import type {IconKeys} from '../../features/Icon'

// Override the global jest.setup.ts theme mock so that unknown icon keys
// (like 'e2e-logo') are NOT intercepted by the Proxy. This lets the
// themeConfig fallback in Icon.tsx actually resolve them.
jest.mock('../../theme', () => {
  const {defaultThemeConfig} = require('../defaultThemeConfig')
  return {
    theme: {
      ...defaultThemeConfig,
      // Plain object — only known keys exist; unknown keys return undefined
      icons: {...defaultThemeConfig.icons},
    },
  }
})

const RuntimeIcon = {
  default: (props: any) => {
    const R = require('react')
    return R.createElement('MockRuntimeSvg', {testID: 'runtime-svg', ...props})
  },
}

describe('RottProvider -> config merge into themeConfig', () => {
  it('config.icons are merged into themeConfig.icons', async () => {
    await render(
      <RottProvider config={{icons: {'runtime-logo': RuntimeIcon as any}}}>
        {null}
      </RottProvider>
    )

    expect(themeConfig.icons['runtime-logo']).toBeDefined()
  })

  it('config.colors are merged into themeConfig.colors', async () => {
    await render(
      <RottProvider config={{colors: {brandX: '#abcabc'}}}>{null}</RottProvider>
    )

    expect(themeConfig.colors.brandX).toBe('#abcabc')
  })

  it('rott.config (theme) overrides config on key collisions', async () => {
    // 'white' exists in the default theme; a config override must NOT win
    const themeWhite = themeConfig.colors.white
    await render(
      <RottProvider config={{colors: {white: '#000000'}}}>{null}</RottProvider>
    )

    expect(themeConfig.colors.white).toBe(themeWhite)
    expect(themeConfig.colors.white).not.toBe('#000000')
  })

  it('an icon registered via RottProvider config renders through <Icon> end to end', async () => {
    const {getByTestId} = await render(
      <RottProvider config={{icons: {'e2e-logo': RuntimeIcon as any}}}>
        <Icon name={'e2e-logo' as IconKeys} testID='e2e-icon' />
      </RottProvider>
    )

    expect(getByTestId('e2e-icon')).toBeOnTheScreen()
    expect(getByTestId('runtime-svg')).toBeTruthy()
  })
})
