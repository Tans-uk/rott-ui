import {StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'
import {commonUiStyleProperties, fontSizeNormalizer} from '../../../utils'
import {InputStyleNormalizer} from '../utils'

export const InputStyles = (props?: any) =>
  StyleSheet.create({
    textInputContainer: {
      opacity: props?.disabled ? 0.3 : 1,
    },
    defaultTextInputStyle: {
      ...commonUiStyleProperties(props),

      width: '100%',
      height: InputStyleNormalizer({size: props?.size}).height,
      fontSize: props?.fontSize
        ? fontSizeNormalizer(props?.fontSize)
        : fontSizeNormalizer(InputStyleNormalizer({size: props?.size}).placeholderSize),
      color: props?.theme === 'light' ? themeConfig.colors['grey-900'] : themeConfig.colors.white,

      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: props?.letterSpacing ?? 0.5,
      fontFamily: 'Markpro-Medium',
    } as any,
  })
