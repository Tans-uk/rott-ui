import React, {type FC, type PropsWithChildren} from 'react'

import {type GestureResponderEvent} from 'react-native'

import {type Size} from '../../../models'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import type {InputIconProps} from '../models'
import {inputIconGapNormalizer, InputStyleNormalizer} from '../utils'

interface InputFieldProps extends PropsWithChildren {
  size?: Size
  leftIcon?: InputIconProps
  rightIcon?: InputIconProps
  /** Stops an icon press bubbling to the root for types with a root Pressable, such as checkbox and toggle. */
  stopPropagation?: boolean
}

export interface IconSlotProps {
  icon: InputIconProps
  side: 'left' | 'right'
  gap: number
  size?: Size
  stopPropagation?: boolean
  testID: string
}

export const IconSlot: FC<IconSlotProps> = ({icon, side, gap, size, stopPropagation, testID}) => {
  const {onPress, width, height, accessibilityLabel, ...iconProps} = icon
  const spacing = side === 'left' ? {marginRight: gap} : {marginLeft: gap}
  const fallback = InputStyleNormalizer({size}).icon

  const iconElement = (
    <Icon width={width ?? fallback.width} height={height ?? fallback.height} {...iconProps} />
  )

  if (!onPress) {
    return (
      <Item testID={testID} flex={0} {...spacing}>
        {iconElement}
      </Item>
    )
  }

  return (
    <Pressable
      testID={testID}
      flex={0}
      alignItemsCenter
      justifyContentCenter
      accessibilityRole='button'
      accessibilityLabel={accessibilityLabel ?? `input-${side}-icon`}
      {...spacing}
      onPress={(event: GestureResponderEvent) => {
        if (stopPropagation) event?.stopPropagation?.()
        onPress(event)
      }}>
      {iconElement}
    </Pressable>
  )
}

/**
 * Shared layout wrapper for the text-based input types.
 * Children are wrapped in a flex:1 content cell, which fills the horizontal space
 * left between the icon slots — the child does not need its own flex:1.
 */
export const InputField: FC<InputFieldProps> = ({
  size,
  leftIcon,
  rightIcon,
  stopPropagation,
  children,
}) => {
  const gap = inputIconGapNormalizer(size)

  return (
    <Item row alignItemsCenter>
      {leftIcon && (
        <IconSlot
          testID='input-field-left-icon'
          icon={leftIcon}
          side='left'
          gap={gap}
          size={size}
          stopPropagation={stopPropagation}
        />
      )}

      <Item flex={1}>{children}</Item>

      {rightIcon && (
        <IconSlot
          testID='input-field-right-icon'
          icon={rightIcon}
          side='right'
          gap={gap}
          size={size}
          stopPropagation={stopPropagation}
        />
      )}
    </Item>
  )
}
