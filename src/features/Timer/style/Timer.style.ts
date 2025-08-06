import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const useTimerStyles = (props?: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultTimerContainer: {
      ...commonUiStyleProperties,
    } as any,
  })
}
