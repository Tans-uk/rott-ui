import {StyleSheet} from 'react-native'

import {useDisplay} from '../../../../../hooks'

export const useSelectInputStyles = () => {
  const {setHeight, px} = useDisplay()

  return StyleSheet.create({
    selectInputModalStyle: {
      height: setHeight(65),
    },
    pressableTextStyle: {
      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: 0.5,
      width: '90%',
    },
    activityIndicator: {
      height: px(72),
    },
  })
}
