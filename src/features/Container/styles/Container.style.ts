import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useCommonUiStyleProperties} from '../../../hooks'

export const useContainerStyle = ({flex, noPadding, ...props}: any) => {
  const {colors} = useContext(RottUiContext)
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultContainerStyle: {
      ...commonUiStyleProperties,
      flex: flex ?? 1,
      paddingHorizontal: noPadding ? 0 : props.paddingHorizontal,

      backgroundColor: props?.backgroundColor ?? colors['grey-800'],
    } as any,
  })
}
