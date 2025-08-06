import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useCommonUiStyleProperties} from '../../../hooks'

export const useSeparatorStyles = (props?: any) => {
  const {colors} = useContext(RottUiContext)

  return StyleSheet.create({
    defaultSeparator: {
      ...(useCommonUiStyleProperties(props) as any),

      backgroundColor: colors[props?.variant],

      opacity: props?.opacity,
    } as any,
  })
}
