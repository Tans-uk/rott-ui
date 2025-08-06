import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const useIconStyles = (props?: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultIconStyle: {
      ...commonUiStyleProperties,
    } as any,
  })
}
