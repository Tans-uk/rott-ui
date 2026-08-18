import {StyleSheet} from 'react-native'

// TODO: drop FontFamily here and import it from @features/Label instead.
export const DateInputStyles = () =>
  StyleSheet.create({
    pressableTextStyle: {
      letterSpacing: 0.5,
      fontFamily: 'Markpro-Medium',
    },
    dateInputHeaderStyle: {
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
    },
    confirmButtonStyle: {
      position: 'absolute',
      right: '5%',
    },
    cancelButtonStyle: {
      position: 'absolute',
      left: '5%',
    },
  })
