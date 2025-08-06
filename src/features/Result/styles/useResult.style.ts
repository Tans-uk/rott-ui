import {useContext} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../contexts'

export const useResultStyles = () => {
  const {colors} = useContext(RottUiContext)

  return StyleSheet.create({
    container: {
      backgroundColor: colors['grey-900'],
      position: 'relative',
    },

    list: {minHeight: 2},
  })
}
