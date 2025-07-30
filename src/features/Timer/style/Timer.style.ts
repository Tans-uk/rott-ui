import {StyleSheet} from 'react-native'

import {commonUiStyleProperties} from '../../../utils'

export const TimerStyles = (props?: any) =>
  StyleSheet.create({
    defaultTimerContainer: {
      ...commonUiStyleProperties(props),
    } as any,
  })
