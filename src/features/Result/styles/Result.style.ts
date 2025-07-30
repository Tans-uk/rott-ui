import {StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'

export const ResultStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: themeConfig.colors['grey-900'],
      position: 'relative',
    },

    list: {minHeight: 2},
  })
