import {isValidElement, type FC} from 'react'

import {StyleSheet} from 'react-native'

import {ThemeConfig} from '../../../models'
import {Label} from '../../Label'
import type {PressableProps} from '../models'
import {usePressableStyles} from '../styles'
import {PressableContainer} from './PressableContainer'

export const Pressable: FC<PressableProps<ThemeConfig>> = ({
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
  const {defaultPressableStyle} = usePressableStyles({
    includeAlignItems: true,
    includeJustifyContent: true,
    ...props,
  })

  return (
    <PressableContainer
      animated={animated}
      ref={ref}
      testID='pressable-test-id'
      style={StyleSheet.flatten([defaultPressableStyle, style])}
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
