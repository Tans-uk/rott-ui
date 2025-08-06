import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useDisplay} from '../../../hooks'

export const useToggleStyle = () => {
  const {colors} = useContext(RottUiContext)
  const display = useDisplay()

  return StyleSheet.create({
    toggleContainer: {
      width: display.px(64),
      height: display.px(32),
      borderRadius: 16,
      justifyContent: 'center',
    },
    toggleWheelStyle: {
      width: display.px(23),
      height: display.px(23),
      backgroundColor: colors.white,
      borderRadius: display.px(23),
      borderWidth: display.px(2),
      borderColor: colors['neutral-alpha-200'],
    },
  })
}
