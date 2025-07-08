import {StyleSheet} from 'react-native'

import {colorFromVariant, commonUiStyleProperties} from '@utils'

export const SeparatorStyles = (props?: any) =>
  StyleSheet.create({
    defaultSeparator: {
      ...commonUiStyleProperties(props),

      backgroundColor: colorFromVariant(props?.variant),

      opacity: props?.opacity,
    } as any,
  })
