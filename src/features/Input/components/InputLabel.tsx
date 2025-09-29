import React, {FC} from 'react'

import {useRottContext} from '../../../hooks'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'
import {InputLabelProps} from '../models'
import {InputStyleNormalizer} from '../utils'

export const InputLabel: FC<InputLabelProps> = ({
  text,
  disabled,
  icon,
  size,
  theme,
  variant,
  fontFamily,
  description,
  descriptionSize,
  descriptionVariant,
}) => {
  const {language} = useRottContext()
  const getVariant = () => {
    if (variant) return variant
    else if (theme && theme === 'dark') return 'grey-900'
    else if (disabled) return 'grey-200'
    else return 'grey-900'
  }
  const variantCalculation = getVariant()

  return (
    <Item
      row
      paddingHorizontal={InputStyleNormalizer({size: size}).paddingHorizontal}
      alignItemsCenter>
      <Label
        testID='input-label-test-id'
        fontSize={size ? size : 'xs'}
        fontFamily={fontFamily ? fontFamily : 'Markpro-Bold'}
        style={{letterSpacing: 0.5}}
        variant={variantCalculation}>
        {text?.toLocaleUpperCase(language?.name)}
      </Label>

      {description && (
        <Label
          testID='input-label-description-test-id'
          marginLeft={4}
          fontSize={descriptionSize ?? 'xs'}
          fontFamily={fontFamily ?? 'Markpro-Bold'}
          variant={descriptionVariant ?? 'grey-200'}>
          {`(${description?.toLocaleUpperCase(language?.name)})`}
        </Label>
      )}

      {(icon || disabled) && (
        <Pressable
          flex={0}
          alignItemsCenter
          justifyContentCenter
          disabled={disabled}
          marginLeft={4}
          width={icon ? icon?.width && icon.width : 18}
          height={icon ? icon?.height && icon.height : 18}
          onPress={icon ? icon?.onPress : null}>
          <Icon
            testID='input-label-description-icon-test-id'
            name={icon ? icon?.name : 'LOCK'}
            width={icon ? icon?.width : 18}
            height={icon ? icon?.height : 18}
            variant={icon?.variant ?? variantCalculation}
            mode={icon ? icon?.mode : 'stroke'}
            strokeWidth={icon ? icon?.strokeWidth : 2}
            noStroke={icon ? icon?.noStroke : false}
          />
        </Pressable>
      )}
    </Item>
  )
}
