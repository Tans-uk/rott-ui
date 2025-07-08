import {StyleSheet} from 'react-native'

import {themeConfig} from '@providers'
import {commonUiStyleProperties, display} from '@utils'

export const TabStyle = (props?: any) =>
  StyleSheet.create({
    container: {
      ...(commonUiStyleProperties(props) as any),

      width: display.px(159.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontFamily: Fonts.MARKPRO_BOLD,
      fontSize: 14,
      color: props?.isSelected ? themeConfig.colors['grey-900'] : themeConfig.colors['grey-100'],
    },
  })
