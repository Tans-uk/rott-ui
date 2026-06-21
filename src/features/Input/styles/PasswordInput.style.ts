import {StyleSheet} from 'react-native'

export const PasswordInputStyles = () =>
  StyleSheet.create({
    showPasswordIcon: {
      position: 'absolute',
      top: 0,
      right: 10,
      bottom: 0,
    },
    leadingIcon: {
      position: 'absolute',
      top: 0,
      left: 10,
      bottom: 0,
      justifyContent: 'center',
    },
  })
