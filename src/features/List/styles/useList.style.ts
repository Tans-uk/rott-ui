import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const useListStyles = (props?: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultListContainerStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.horizontal ? 'row' : 'column',
    } as any,
    emptyStateContainer: {
      height: props?.containerHeight,
    },
  })
}
