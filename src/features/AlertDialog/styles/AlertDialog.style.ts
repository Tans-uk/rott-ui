import {StyleSheet} from 'react-native'

import {commonUiStyleProperties} from '@utils'

export const AlertDialogStyles = (props: any) =>
  StyleSheet.create({
    defaultInformationModalStyle: {
      ...commonUiStyleProperties(props),
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
