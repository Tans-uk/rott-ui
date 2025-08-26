import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import {type TimerProps} from '../models'
import {TimerStyles} from '../style'

import {Item} from '../../Item'
import {Label} from '../../Label'
import React from 'react'

export const TimerComponent: FC<TimerProps> = ({color, time, style, ...props}) => {
  const renderTime = () => {
    const formattedTime = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`

    return formattedTime
  }

  return (
    <Item style={StyleSheet.flatten([TimerStyles(props).defaultTimerContainer, style])}>
      <Label fontSize='xl' fontWeight='bold' testID='timerTestId' color={color}>
        {renderTime()}
      </Label>
    </Item>
  )
}
