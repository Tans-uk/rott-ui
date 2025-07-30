import {StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'
import {display} from '../../../utils'

export const ToggleStyles = () =>
  StyleSheet.create({
    toggleContainer: {
      width: display.px(64),
      height: display.px(32),
      borderRadius: 16,
      justifyContent: 'center',
    },
    toggleWheelStyle: {
      width: display.px(23),
      height: display.px(23),
      backgroundColor: themeConfig.colors.white,
      borderRadius: display.px(23),
      borderWidth: display.px(2),
      borderColor: themeConfig.colors['neutral-alpha-200'],
    },
  })
