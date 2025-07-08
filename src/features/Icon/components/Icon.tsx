import {type FC} from 'react'

import type {IconProps} from '../models'

import {Item} from '@features/Item'
import {colorFromVariant, display} from '@utils'

export const Icon: FC<IconProps> = ({
  name,
  width = 16,
  height = 16,
  variant = 'white',
  strokeWidth = 1,
  mode = 'stroke',
  noStroke,
  color,
  ...props
}) => {
  const IconComponent = Icons[name]

  if (!IconComponent) return null

  return (
    <Item {...props}>
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
      />
    </Item>
  )
}
