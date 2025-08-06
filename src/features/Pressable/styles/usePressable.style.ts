import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const usePressableStyles = (props: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultPressableStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex === 0 ? 0 : 1,
    } as any,
  })
}
