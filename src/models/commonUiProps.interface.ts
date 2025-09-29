import {type FontFamily, type FontWeight} from '../features/Label/models'
import {type Size} from './size.type'
import {type Variant} from './variant.type'

export interface CommonUiProps {
  heightNormalizeBased?: boolean
  size?: Size

  width?: number | string
  height?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  minWidth?: number | string
  minHeight?: number | string

  fontSize?: Exclude<Size, 'full'> | number
  fontFamily?: FontFamily
  fontWeight?: FontWeight
  color?: string
  variant?: Variant

  flex?: number
  flexGrow?: number
  flexShrink?: number

  alignItemsCenter?: boolean
  alignItemsFlexStart?: boolean
  alignItemsFlexEnd?: boolean
  alignItemsBaseline?: boolean
  alignItemsStretch?: boolean
  justifyContentCenter?: boolean
  justifyContentFlexStart?: boolean
  justifyContentFlexEnd?: boolean
  justifyContentSpaceAround?: boolean
  justifyContentSpaceBetween?: boolean

  backgroundColor?: string
  borderRadius?: number | string
  borderTopEndRadius?: number | string
  borderTopStartRadius?: number | string
  borderBottomStartRadius?: number | string
  borderBottomEndRadius?: number | string
  borderLeftWidth?: number | string
  borderRightWidth?: number | string
  borderTopWidth?: number | string
  borderBottomWidth?: number | string
  borderTopColor?: string
  borderBottomColor?: string
  borderEndColor?: string
  borderLeftColor?: string
  borderRightColor?: string
  borderBlockColor?: string
  borderBlockEndColor?: string
  borderBlockStartColor?: string

  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  marginVertical?: string | number
  marginHorizontal?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
  paddingVertical?: string | number
  paddingHorizontal?: string | number

  borderWidth?: string | number
  borderColor?: string

  absolute?: boolean
  relative?: boolean
  position?: 'relative' | 'absolute' | undefined
  zIndex?: number
  left?: number
  right?: number
  top?: number
  bottom?: number

  overflowHidden?: boolean

  letterSpacing?: string | number

  gap?: number
  elevation?: number
  shadowColor?: string
  shadowOffset?: {width: number; height: number}
  shadowOpacity?: number
  shadowRadius?: number
  boxShadow?:
    | string
    | {
        offsetX?: number
        offsetY?: number
        blurRadius?: number
        spreadDistance?: number
        color?: string
      }
}
