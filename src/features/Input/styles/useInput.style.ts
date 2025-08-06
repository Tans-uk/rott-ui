import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useCommonUiStyleProperties} from '../../../hooks'
import {fontSizeNormalizer} from '../../../utils'
import {useInputStyleNormalizer} from '../utils'

export const useInputStyles = (props?: any) => {
  const {colors} = useContext(RottUiContext)
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    textInputContainer: {
      opacity: props?.disabled ? 0.3 : 1,
    },
    defaultTextInputStyle: {
      ...commonUiStyleProperties,

      width: '100%',
      height: useInputStyleNormalizer({size: props?.size}).height,
      fontSize: props?.fontSize
        ? fontSizeNormalizer(props?.fontSize)
        : fontSizeNormalizer(useInputStyleNormalizer({size: props?.size}).placeholderSize),
      color: props?.theme === 'light' ? colors['grey-900'] : colors.white,

      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: props?.letterSpacing ?? 0.5,
      fontFamily: 'Markpro-Medium',
    } as any,
  })
}
