import {isValidElement, type FC} from 'react'

import {StyleSheet} from 'react-native'

import {Label} from '../../Label'
import type {PressableProps} from '../models'
import {PressableStyles} from '../styles'
import {PressableContainer} from './PressableContainer'

export const Pressable: FC<PressableProps> = ({
  text,
  textStyle,
  textVariant = 'grey-900',
  textSize = 'md',
  textWeight,
  animated = false,
  children,
  style,
  ref,
  ...props
}) => {
  return (
    <PressableContainer
      animated={animated}
      ref={ref}
      testID='pressable-test-id'
      style={StyleSheet.flatten([
        PressableStyles({
          includeAlignItems: true,
          includeJustifyContent: true,
          ...props,
        }).defaultPressableStyle,
        style,
      ])}
      {...props}>
      {text && !isValidElement(text) && (
        <Label style={textStyle} variant={textVariant} fontSize={textSize} fontWeight={textWeight}>
          {text}
        </Label>
      )}

      {!text && <>{children}</>}
    </PressableContainer>
  )
}
