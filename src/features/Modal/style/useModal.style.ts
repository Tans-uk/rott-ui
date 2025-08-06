import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'

export const useModalStyles = () => {
  const {colors} = useContext(RottUiContext)

  return StyleSheet.create({
    fadedBackgroundStyles: {
      backgroundColor: colors['neutral-alpha-700'],
      justifyContent: 'center',
      alignContent: 'center',
    },
    animatedViewStyles: {
      flexDirection: 'row',
      flex: 1,

      elevation: 5,
      shadowColor: colors['neutral-shadow-300'],
      shadowOffset: {width: 0, height: -8},
      shadowOpacity: 1,
      shadowRadius: 35,
    },
  })
}
