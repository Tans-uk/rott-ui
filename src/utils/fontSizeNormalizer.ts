import {Dimensions} from 'react-native'

export const fontSizeNormalizer = (
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | number
) => {
  const isSmallScreen = Dimensions.get('window').width < 380

  switch (fontSize) {
    case 'xs':
      return isSmallScreen ? 8 : 10
    case 'sm':
      return isSmallScreen ? 10 : 12
    case 'md':
      return isSmallScreen ? 12 : 14
    case 'lg':
      return isSmallScreen ? 14 : 16
    case 'xl':
      return isSmallScreen ? 16 : 18
    case 'xxl':
      return isSmallScreen ? 22 : 24
    case 'xxxl':
      return isSmallScreen ? 34 : 36
    default:
      return fontSize
  }
}
