import {StyleSheet} from 'react-native'

import {commonUiStyleProperties} from '../../../utils'

export const ImageStyles = (props?: any) =>
  StyleSheet.create({
    defaultImageStyle: {
      ...commonUiStyleProperties(props),
      resizeMode: 'contain',
      overflow: 'hidden',
    } as any,
  })
