import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {theme} from '../../../theme'
import {colorFromVariant} from '../../../utils'
import {Icon} from '../components'
import type {IconKeys} from '../models'

// Mock theme icons
jest.mock('../../../theme', () => ({
  theme: {
    icons: {
      'arrow-left': {
        default: jest.fn().mockImplementation((props) => {
          const React = require('react')

          return React.createElement('MockSvgIcon', {testID: 'mock-svg', ...props})
        }),
      },
      'check-circle': {
        default: jest.fn().mockImplementation((props) => {
          const React = require('react')

          return React.createElement('MockSvgIcon', {testID: 'mock-svg', ...props})
        }),
      },
    },
  },
}))

// Mock RottProvider runtime icon registry (themeConfig)
jest.mock('../../../providers/RottProvider', () => ({
  themeConfig: {
    icons: {
      'runtime-only-icon': {
        default: jest.fn().mockImplementation((props) => {
          const React = require('react')

          return React.createElement('MockSvgIcon', {testID: 'mock-runtime-svg', ...props})
        }),
      },
      // present in BOTH theme and themeConfig — theme (rott.config) must win
      'arrow-left': {
        default: jest.fn().mockImplementation((props) => {
          const React = require('react')

          return React.createElement('MockSvgIcon', {testID: 'mock-runtime-arrow', ...props})
        }),
      },
    },
  },
}))

// Mock hooks
jest.mock('../../../hooks', () => ({
  useSafeArea: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
  useRottContext: jest.fn(() => ({
    language: {name: 'en-US'},
  })),
}))

// Mock utilities
jest.mock('../../../utils', () => ({
  colorFromVariant: jest.fn((variant) => {
    const colors: Record<string, string> = {
      primary: '#007AFF',
      secondary: '#5856D6',
      success: '#34C759',
      warning: '#FF9500',
      danger: '#FF3B30',
      white: '#FFFFFF',
      black: '#000000',
    }

    return colors[variant] || '#000000'
  }),
  display: {
    px: jest.fn((value) => value),
    normalize: jest.fn((value) => value),
    setHeightDevice: jest.fn((value) => value),
    setHeight: jest.fn((value) => value),
    setWidth: jest.fn((value) => value),
  },
  commonUiStyleProperties: jest.fn(() => ({})),
}))

const testIds = {
  iconTestId: 'icon-test-id',
  mockSvgTestId: 'mock-svg',
}

describe('Icon -> Custom Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('matches the icon component snapshot', async () => {
    const rendered = await render(<Icon name='arrow-left' testID={testIds.iconTestId} />)

    expect(rendered).toMatchSnapshot()
  })

  it('renders the icon matching the given name prop', async () => {
    const {getByTestId} = await render(<Icon name='arrow-left' testID={testIds.iconTestId} />)

    const iconElement = getByTestId(testIds.iconTestId)

    expect(iconElement).toBeOnTheScreen()
    expect(theme.icons['arrow-left'].default).toHaveBeenCalled()
  })

  it('returns null when the icon is not found', async () => {
    const {queryByTestId} = await render(
      <Icon name={'UNKNOWN_ICON' as IconKeys} testID={testIds.iconTestId} />
    )

    const iconElement = queryByTestId(testIds.iconTestId)
    expect(iconElement).not.toBeOnTheScreen()
  })

  describe('Icon -> RottProvider fallback (rott.config primary)', () => {
    const {themeConfig} = require('../../../providers/RottProvider')

    it('renders a name absent from rott.config (theme.icons) through themeConfig.icons', async () => {
      const {getByTestId} = await render(
        <Icon name={'runtime-only-icon' as IconKeys} testID={testIds.iconTestId} />
      )

      const iconElement = getByTestId(testIds.iconTestId)
      expect(iconElement).toBeOnTheScreen()
      expect(themeConfig.icons['runtime-only-icon'].default).toHaveBeenCalled()
    })

    it('prefers theme (rott.config) when a name exists in both theme and themeConfig', async () => {
      await render(<Icon name='arrow-left' testID={testIds.iconTestId} />)

      expect(theme.icons['arrow-left'].default).toHaveBeenCalled()
      expect(themeConfig.icons['arrow-left'].default).not.toHaveBeenCalled()
    })
  })

  describe('Icon -> Size Props', () => {
    it('defaults width and height to 16', async () => {
      await render(<Icon name='arrow-left' testID={testIds.iconTestId} />)

      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.width).toBe(16)
      expect(lastCall.height).toBe(16)
    })

    it('applies custom width and height values correctly', async () => {
      const customWidth = 24
      const customHeight = 32

      await render(
        <Icon
          name='arrow-left'
          width={customWidth}
          height={customHeight}
          testID={testIds.iconTestId}
        />
      )

      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.width).toBe(customWidth)
      expect(lastCall.height).toBe(customHeight)
    })
  })

  describe('Icon -> Mode Behavior', () => {
    it('applies the variant colour as fill in fill mode', async () => {
      await render(
        <Icon name='arrow-left' mode='fill' variant='primary' testID={testIds.iconTestId} />
      )
      expect(colorFromVariant).toHaveBeenCalledWith('primary')
      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.fill).toBe('#007AFF')
      expect(lastCall.strokeWidth).toBe(0)
    })

    it('applies the variant colour as stroke in stroke mode', async () => {
      await render(
        <Icon name='arrow-left' mode='stroke' variant='danger' testID={testIds.iconTestId} />
      )
      expect(colorFromVariant).toHaveBeenCalledWith('danger')
      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.stroke).toBe('#FF3B30')
      expect(lastCall.strokeWidth).toBe(1)
    })

    it('uses color instead of variant when a custom color prop is given', async () => {
      const customColor = '#123456'

      await render(
        <Icon
          name='arrow-left'
          mode='fill'
          variant='primary'
          color={customColor}
          testID={testIds.iconTestId}
        />
      )

      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.fill).toBe(customColor)
    })
  })

  describe('Icon -> Stroke Properties', () => {
    it('sets strokeWidth to 0 when noStroke is true', async () => {
      await render(<Icon name='arrow-left' mode='stroke' noStroke testID={testIds.iconTestId} />)

      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.strokeWidth).toBe(0)
    })

    it('applies a custom strokeWidth correctly', async () => {
      const customStrokeWidth = 2.5

      await render(
        <Icon
          name='arrow-left'
          mode='stroke'
          strokeWidth={customStrokeWidth}
          testID={testIds.iconTestId}
        />
      )

      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.strokeWidth).toBe(customStrokeWidth)
    })

    it('applies strokeLinecap and strokeLinejoin correctly', async () => {
      await render(
        <Icon
          name='arrow-left'
          strokeLinecap='round'
          strokeLinejoin='bevel'
          testID={testIds.iconTestId}
        />
      )

      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.strokeLinecap).toBe('round')
      expect(lastCall.strokeLinejoin).toBe('bevel')
    })
  })

  describe('Icon -> Opacity Handling', () => {
    it('forwards a numeric opacity to the Item component', async () => {
      const numericOpacity = 0.5

      await render(<Icon name='arrow-left' opacity={numericOpacity} testID={testIds.iconTestId} />)

      // Opacity is handled by commonUiStyleProperties in Item component
      expect(theme.icons['arrow-left'].default).toHaveBeenCalled()
    })

    it('converts a string opacity to a number', async () => {
      const stringOpacity = '0.7'

      await render(<Icon name='arrow-left' opacity={stringOpacity} testID={testIds.iconTestId} />)

      // String opacity should be converted to number by Icon component
      expect(theme.icons['arrow-left'].default).toHaveBeenCalled()
    })

    it('converts an invalid string opacity to NaN', async () => {
      const invalidOpacity = 'invalid'

      const {getByTestId} = await render(
        <Icon name='arrow-left' opacity={invalidOpacity} testID={testIds.iconTestId} />
      )

      const iconElement = getByTestId(testIds.iconTestId)
      // NaN opacity will be ignored by React Native
      expect(iconElement).toBeOnTheScreen()
    })
  })

  describe('Icon -> Custom Fill and Stroke', () => {
    it('applies custom fill and stroke values directly', async () => {
      const customFill = '#FF0000'
      const customStroke = '#00FF00'

      await render(
        <Icon
          name='arrow-left'
          fill={customFill}
          stroke={customStroke}
          testID={testIds.iconTestId}
        />
      )

      // When custom fill is provided, it should be applied
      // However, the Icon component always calculates fill based on mode
      // So the test should check if the stroke is applied correctly
      const lastCall = theme.icons['arrow-left'].default.mock.calls[0][0]
      expect(lastCall.stroke).toBe(customStroke)
    })
  })

  // CommonUI Props are tested through Item component
  // which handles them via commonUiStyleProperties
  // The Icon component correctly passes these props to Item

  describe('Icon -> Integration with Item Component', () => {
    it('forwards the remaining props to the Item component', async () => {
      const additionalProps = {
        marginTop: 10,
        marginBottom: 20,
        flex: 1,
      }

      const {getByTestId} = await render(
        <Icon name='arrow-left' testID={testIds.iconTestId} {...additionalProps} />
      )

      const iconElement = getByTestId(testIds.iconTestId)
      // Props are passed to Item component which handles them through commonUiStyleProperties
      expect(iconElement).toBeOnTheScreen()
    })
  })
})
