import React, {type FC} from 'react'

import {theme} from '../../../theme'
import {colorFromVariant, display} from '../../../utils'
import {Item} from '../../Item'
import type {IconProps} from '../models'

export const Icon: FC<IconProps> = ({
  name,
  width = 16,
  height = 16,
  variant = 'white',
  mode = 'fill',
  noStroke,
  strokeWidth = mode === 'fill' || noStroke ? 0 : 1,
  fill,
  stroke,
  color,
  strokeLinecap,
  strokeLinejoin,
  opacity,
  ...props
}) => {
  const IconComponent = theme.icons[name]
  if (!IconComponent) return null

  if (mode === 'fill') fill = color ?? colorFromVariant(variant)
  else if (mode === 'stroke') stroke = color ?? colorFromVariant(variant)

  // Convert opacity to number if it's a string, ensuring type compatibility with ItemProps
  const itemOpacity = typeof opacity === 'string' ? parseFloat(opacity) : opacity

  return (
    <Item {...props} opacity={itemOpacity}>
      <IconComponent.default
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        width={display.px(width)}
        height={display.px(height)}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Item>
  )
}
