import {type FC} from 'react'

import {themeConfig} from '../../../providers'
import {colorFromVariant, display} from '../../../utils'
import {Item} from '../../Item'
import type {IconProps} from '../models'

export const Icon: FC<IconProps> = ({
  name,
  width = 16,
  height = 16,
  variant = 'white',
  mode = 'stroke',
  noStroke,
  strokeWidth = mode === 'fill' || noStroke ? 0 : 1,
  fill,
  stroke,
  strokeLinecap,
  strokeLinejoin,
  color,
  opacity,
  ...props
}) => {
  const IconComponent = themeConfig.icons[name]?.default
  if (!IconComponent) return null

  // Convert opacity to number if it's a string, ensuring type compatibility with ItemProps
  const itemOpacity = typeof opacity === 'string' ? parseFloat(opacity) : opacity

  if (mode === 'fill') fill = color ?? colorFromVariant(variant)
  else if (mode === 'stroke') stroke = color ?? colorFromVariant(variant)

  return (
    <Item {...props} opacity={itemOpacity}>
      <IconComponent
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        width={display.px(width)}
        height={display.px(height)}
        opacity={opacity}
      />
    </Item>
  )
}
