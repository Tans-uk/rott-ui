import type {GestureResponderEvent} from 'react-native'

import type {IconProps} from '../../Icon'

/** InputField slotlarında kullanılan ikon prop'u: IconProps + opsiyonel onPress. */
export interface InputIconProps extends IconProps {
  onPress?: (event: GestureResponderEvent) => void
}
