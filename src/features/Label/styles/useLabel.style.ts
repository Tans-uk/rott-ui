import {Platform, StyleSheet} from 'react-native'

import {useColorFromVariant, useCommonUiStyleProperties} from '../../../hooks'
import {fontSizeNormalizer} from '../../../utils'
import {fontFamilyNormalizer} from '../utils'

export const useLabel = (props?: any) => {
  const colorFromVariant = useColorFromVariant()
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultLabelStyle: {
      ...commonUiStyleProperties,

      textAlign: props?.textCenter ? 'center' : 'auto',
      fontSize: fontSizeNormalizer(props?.fontSize),
      fontFamily:
        !props?.fontFamily && props?.fontWeight
          ? fontFamilyNormalizer(props?.fontWeight)
          : (props?.fontFamily ?? 'Markpro-Medium'),
      fontWeight: props?.fontFamily || Platform.OS !== 'ios' ? undefined : props?.fontWeight,
      color: props?.color ?? colorFromVariant(props?.variant),
    } as any,
  })
}
