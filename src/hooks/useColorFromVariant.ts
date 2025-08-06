import {useContext} from 'react'

import {RottUiContext} from '../contexts'

export const useColorFromVariant = () => {
  const {colors} = useContext(RottUiContext)

  return (variant: keyof typeof colors) => colors[variant]
}
