import type {ReactNode} from 'react'

import type {ImageProps, ImageTypes} from '@features/Image'
import type {FontFamily, FontWeight} from '@features/Label'
import type {CommonUiProps, Size, Variant} from '@models'

interface EmptyStateLabelProps {
  testID?: string
  fontSize?: Size
  fontFamily?: FontFamily
  fontWeight?: FontWeight
  variant?: Variant
  text?: string
}

export interface EmptyStateProps extends CommonUiProps {
  description?: string | EmptyStateLabelProps | ReactNode
  title?: string | EmptyStateLabelProps | ReactNode
  name?: ImageTypes
  imageProps?: ImageProps
  testID?: string
  background?: string
  backgroundColor?: string
  width?: number
  height?: number
}
