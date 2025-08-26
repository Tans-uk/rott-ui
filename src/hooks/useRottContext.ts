import {useContext} from 'react'

import {RottUiContext} from '../contexts'

export const useRottContext = () => {
  const context = useContext(RottUiContext)
  if (!context) {
    throw new Error('useRottContext must be used within a RottProvider')
  }

  return context
}
