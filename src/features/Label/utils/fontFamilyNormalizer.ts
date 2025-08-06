export const fontFamilyNormalizer = (weight: number | string = 500) => {
  switch (weight) {
    case 100:
    case 200:
    case 300:
      return 'Markpro-ExtraLight'
    case 400:
      return 'Markpro-Light'
    case 500:
      return 'Markpro-Book'
    case 600:
    case 'normal':
      return 'Markpro-Medium'
    case 700:
    case 'bold':
      return 'Markpro-Bold'
    case 800:
      return 'Markpro-Heavy'
    case 900:
      return 'Markpro-Black'
    default:
      return 'Markpro-Medium'
  }
}
