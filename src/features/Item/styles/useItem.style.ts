import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const useItemStyles = (props?: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultItemStyles: {
      ...commonUiStyleProperties,

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex ? props?.flex : undefined,
    } as any,
  })
}
