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
  strokeWidth = 1,
  mode = 'stroke',
  noStroke,
  color,
  opacity,
  ...props
}) => {
  const IconComponent = themeConfig.icons[name]?.default
  if (!IconComponent) return null

  // Convert opacity to number if it's a string, ensuring type compatibility with ItemProps
  const itemOpacity = typeof opacity === 'string' ? parseFloat(opacity) : opacity

  return (
    <Item {...props} opacity={itemOpacity}>
      <IconComponent
        fill={mode === 'fill' ? (color ?? colorFromVariant(variant)) : 'transparent'}
        stroke={color ?? colorFromVariant(variant)}
        strokeWidth={
          mode === 'fill' && noStroke
            ? 0
            : mode === 'fill'
              ? 0.5
              : mode === 'stroke' && noStroke
                ? 0
                : strokeWidth
        }
        strokeLinecap='round'
        strokeLinejoin='round'
        width={display.px(width)}
        height={display.px(height)}
        opacity={opacity}
      />
    </Item>
  )
}
