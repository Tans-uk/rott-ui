import {StyleSheet} from 'react-native'

import {commonUiStyleProperties} from '../../../utils'

export const ListStyles = (props?: any) =>
  StyleSheet.create({
    defaultListContainerStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.horizontal ? 'row' : 'column',
    } as any,
    emptyStateContainer: {
      height: props?.containerHeight,
    },
  })
