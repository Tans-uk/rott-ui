import {StyleSheet} from 'react-native'

import {display} from '../../../../../utils'

export const SelectInputStyles = () =>
  StyleSheet.create({
    selectInputModalStyle: {
      height: display.setHeight(65),
    },
    pressableTextStyle: {
      // TODO: revisit once the Android issue is fixed.
      letterSpacing: 0.5,
      width: '90%',
      flex: 1,
    },
    activityIndicator: {
      height: display.px(72),
    },
  })
