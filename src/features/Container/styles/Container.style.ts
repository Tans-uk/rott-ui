import {StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'
import {commonUiStyleProperties} from '../../../utils'

export const ContainerStyles = ({flex, noPadding, ...props}: any) =>
  StyleSheet.create({
    defaultContainerStyle: {
      ...commonUiStyleProperties(props),
      flex: flex ?? 1,
      paddingHorizontal: noPadding ? 0 : props.paddingHorizontal,

      backgroundColor: props?.backgroundColor ?? themeConfig.colors['grey-800'],
    } as any,

    scrollView: {flex: 1, backgroundColor: props.backgroundColor},
  })
