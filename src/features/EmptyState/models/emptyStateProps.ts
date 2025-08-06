import type {ReactNode} from 'react'

import type {CommonUiProps, Size, ThemeConfig} from '../../../models'
import type {ImageProps} from '../../Image/models'

interface EmptyStateLabelProps {
  testID?: string
  fontSize?: Size
  fontFamily?: keyof ThemeConfig['fontFamilies']
  fontWeight?: keyof ThemeConfig['fontWeights']
  variant?: keyof ThemeConfig['colors']
  text?: string
}

export interface EmptyStateProps extends CommonUiProps<ThemeConfig> {
  description?: string | EmptyStateLabelProps | ReactNode
  title?: string | EmptyStateLabelProps | ReactNode
  name?: keyof ThemeConfig['icons']
  imageProps?: ImageProps<ThemeConfig>
  testID?: string
  background?: string
  backgroundColor?: string
  width?: number
  height?: number
}
