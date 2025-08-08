import {ImageSourcePropType} from 'react-native'

import {Language} from './language.interface'

export interface ThemeConfig {
  referenceDevice: {
    width: number
    height: number
  }
  colors: Record<string, string>
  language: Language
  images: Record<string, ImageSourcePropType>
  icons: Record<string, ImageSourcePropType>
  fontSizes: Record<string, number>
  fontFamilies: Record<string, string>
  fontWeights: Record<string, string | number>
  goBack: () => void
}
