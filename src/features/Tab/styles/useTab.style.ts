import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useCommonUiStyleProperties, useDisplay} from '../../../hooks'

export const useTabStyle = (props?: any) => {
  const {colors} = useContext(RottUiContext)
  const {px} = useDisplay()

  return StyleSheet.create({
    container: {
      ...(useCommonUiStyleProperties(props) as any),

      width: px(159.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      // TODO: Add Font Family
      // fontFamily: '',
      fontSize: 14,
      color: props?.isSelected ? colors['grey-900'] : colors['grey-100'],
    },
  })
}
