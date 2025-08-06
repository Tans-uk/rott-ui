import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const useImageStyles = (props?: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultImageStyle: {
      ...commonUiStyleProperties,
      resizeMode: 'contain',
      overflow: 'hidden',
    } as any,
  })
}
