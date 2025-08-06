import {StyleSheet} from 'react-native'

import {
  useColorFromVariant,
  useCommonUiStyleProperties,
  useDisplay,
  useTextColorFromVariant,
} from '../../../hooks'
import {buttonSizeNormalizer} from '../utils'

export const useButtonStyle = (props?: any) => {
  const colorFromVariant = useColorFromVariant()
  const textColorFromVariant = useTextColorFromVariant(props?.variant)
  const {px} = useDisplay()
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultButtonStyle: {
      ...commonUiStyleProperties,

      position: 'relative',
      flexDirection: 'row',
      flex: props?.flex ? props?.flex : undefined,

      alignItems: 'center',
      color: props?.color,

      borderRadius: props.borderRadius ? px(props.borderRadius) : px(8),
      borderWidth: props?.variant?.includes('outline') ? 2 : undefined,
      borderColor: props?.variant?.includes('outline')
        ? colorFromVariant(props?.variant?.replace('-outline', ''))
        : 'white',

      height:
        typeof props?.height === 'number' ||
        typeof props?.size === 'number' ||
        (typeof props?.size === 'object' && typeof props?.size.height === 'number')
          ? px(
              props.size
                ? props.size.height !== undefined
                  ? props.size.height
                  : props.size
                : props.height
            )
          : props.size
            ? buttonSizeNormalizer(
                props?.size
                  ? props?.size.height !== undefined
                    ? props?.size.height
                    : props?.size
                  : props?.height
              ).height
            : undefined,

      width:
        typeof props?.width === 'number' ||
        typeof props?.size === 'number' ||
        (typeof props?.size === 'object' && typeof props?.size.width === 'number')
          ? px(
              props.size
                ? props.size.width !== undefined
                  ? props.size.width
                  : props.size
                : props.width
            )
          : props.size
            ? buttonSizeNormalizer(
                props?.size
                  ? props?.size.width !== undefined
                    ? props?.size.width
                    : props?.size
                  : props?.width
              ).width
            : undefined,

      opacity: props?.disabled ? 0.6 : 1,
      backgroundColor: props?.backgroundColor
        ? props?.backgroundColor
        : colorFromVariant(props?.variant),
    },
    buttonTextStyle: {
      color: props?.color ? colorFromVariant(props?.color) : textColorFromVariant,
      textAlignVertical: 'center',
      flexShrink: 1,
    },
  })
}
