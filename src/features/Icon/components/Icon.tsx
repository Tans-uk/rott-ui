import {useContext, type FC} from 'react'

import {RottUiContext} from '../../../contexts'
import {useDisplay} from '../../../hooks'
import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import type {IconProps} from '../models'

export const Icon: FC<IconProps<ThemeConfig>> = ({
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
  const {icons, colors} = useContext(RottUiContext)
  const {px} = useDisplay()
  const IconComponent = icons?.[name as keyof typeof icons] as any
  if (!IconComponent || !(IconComponent as any)?.default) return null

  if (mode === 'fill') fill = color ?? colors[variant]
  else if (mode === 'stroke') stroke = color ?? colors[variant]

  // Convert opacity to number if it's a string, ensuring type compatibility with ItemProps
  const itemOpacity = typeof opacity === 'string' ? parseFloat(opacity) : opacity

  return (
    <Item {...props} opacity={itemOpacity}>
      <IconComponent.default
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        width={px(width)}
        height={px(height)}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Item>
  )
}
