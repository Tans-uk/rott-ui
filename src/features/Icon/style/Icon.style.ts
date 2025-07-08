import {StyleSheet} from 'react-native'

import {commonUiStyleProperties} from '@utils'

export const IconStyles = (props?: any) =>
  StyleSheet.create({
    defaultIconStyle: {
      ...commonUiStyleProperties(props),
    } as any,
  })
