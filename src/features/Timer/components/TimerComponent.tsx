import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {type TimerProps} from '../models'
import {useTimerStyles} from '../style'

export const TimerComponent: FC<TimerProps<ThemeConfig>> = ({color, time, style, ...props}) => {
  const {defaultTimerContainer} = useTimerStyles(props)
  const renderTime = () => {
    const formattedTime = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`

    return formattedTime
  }

  return (
    <Item style={StyleSheet.flatten([defaultTimerContainer, style])}>
      <Label fontSize='xl' fontWeight='bold' testID='timerTestId' color={color}>
        {renderTime()}
      </Label>
    </Item>
  )
}
