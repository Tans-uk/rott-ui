import {Platform, StyleSheet} from 'react-native'

import {colorFromVariant, commonUiStyleProperties, fontSizeNormalizer} from '../../../utils'
import {fontFamilyNormalizer} from '../utils'

export const LabelStyles = (props?: any) =>
  StyleSheet.create({
    defaultLabelStyle: {
      ...commonUiStyleProperties(props),

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
