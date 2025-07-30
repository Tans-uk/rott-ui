import {StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'

export const ModalStyles = () =>
  StyleSheet.create({
    fadedBackgroundStyles: {
      backgroundColor: themeConfig.colors['neutral-alpha-700'],
      justifyContent: 'center',
      alignContent: 'center',
    },
    animatedViewStyles: {
      flexDirection: 'row',
      flex: 1,

      elevation: 5,
      shadowColor: themeConfig.colors['neutral-shadow-300'],
      shadowOffset: {width: 0, height: -8},
      shadowOpacity: 1,
      shadowRadius: 35,
    },
  })
