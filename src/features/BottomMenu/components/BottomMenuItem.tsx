import {type FC} from 'react'

import {Linking} from 'react-native'

import type {BottomMenuItemModel} from '../models'
import {BottomMenuStyles} from '../styles'

import {Icon} from '@features/Icon'
import {Image} from '@features/Image'
import {Label} from '@features/Label'
import {Pressable} from '@features/Pressable'
import {themeConfig} from '@providers'

export const BottomMenuItem: FC<BottomMenuItemModel> = ({
  testID,
  title,
  icon,
  image,
  containerStyle,
  onPress,
  url,
  phone,
}) => {
  const isPhone = !!phone && !phone.isEmpty()

  return (
    <Pressable
      testID={testID}
      alignItemsCenter
      width={containerStyle ? 56 : undefined}
      style={containerStyle}
      onPress={async (event) => {
        if (process.env.NODE_ENV === 'development' && isPhone) return
        else if (isPhone) await Linking.openURL(`tel:${phone}`)
        else if (url && (await Linking.canOpenURL(url))) await Linking.openURL(url)
        else if (onPress) onPress(event)
      }}>
      {icon && !image && (
        <Icon
          {...icon}
          name={icon.name}
          width={icon?.width ? icon.width : 24}
          height={icon?.height ? icon.height : 24}
          variant={icon.variant ?? 'grey-900'}
          mode={icon?.mode}
          strokeWidth={icon?.strokeWidth ? icon?.strokeWidth : 2}
          marginBottom={8}
        />
      )}

      {image && !icon && (
        <Image
          {...image}
          width={image?.width ? image?.width : 24}
          height={image?.height ? image.height : 24}
          tintColor={image?.width && image?.height ? undefined : themeConfig.colors['grey-900']}
          marginBottom={8}
          resizeMode='contain'
          name={image.name}
        />
      )}

      {title && (
        <Label
          style={BottomMenuStyles().textStyle}
          variant='grey-900'
          fontSize='xs'
          fontWeight='bold'
          numberOfLines={1}>
          {title}
        </Label>
      )}
    </Pressable>
  )
}
