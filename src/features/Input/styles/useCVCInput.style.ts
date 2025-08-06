import {StyleSheet} from 'react-native'

import {useDisplay} from '../../../hooks'

export const useCVCInputStyles = () =>
  StyleSheet.create({
    infoIcon: {
      position: 'absolute',
      top: useDisplay().px(-15),
      left: useDisplay().px(60),
    },
  })
