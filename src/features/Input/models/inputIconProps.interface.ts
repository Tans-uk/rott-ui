import type {GestureResponderEvent} from 'react-native'

import type {IconProps} from '../../Icon'

/** Icon prop used in InputField slots: IconProps plus an optional onPress. */
export interface InputIconProps extends IconProps {
  onPress?: (event: GestureResponderEvent) => void
}
