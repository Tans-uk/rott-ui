import {StyleSheet} from 'react-native'

import {display} from '@utils'

export const SelectInputStyles = () =>
  StyleSheet.create({
    selectInputModalStyle: {
      height: display.setHeight(65),
    },
    pressableTextStyle: {
      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: 0.5,
      width: '90%',
    },
    activityIndicator: {
      height: display.px(72),
    },
  })
