import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties} from '../../../hooks'

export const AlertDialogStyles = (props: any) => {
  const {commonUiStyleProperties} = useCommonUiStyleProperties(props)

  return StyleSheet.create({
    defaultInformationModalStyle: {
      ...commonUiStyleProperties,
    } as any,
    InformationModalView: {
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  })
}
