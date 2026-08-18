import React, {type FC} from 'react'

import {Platform} from 'react-native'

import {useSafeArea} from '../../../hooks'
import {themeConfig} from '../../../providers'
import {Content} from '../../Content'
import type {BottomMenuItemModel} from '../models'
import {BottomMenuItem} from './BottomMenuItem'

interface BottomMenuProps {
  menuItems: BottomMenuItemModel[]
}

export const BottomMenu: FC<BottomMenuProps> = ({menuItems}) => {
  const {bottom} = useSafeArea()

  let absoluteHeight = 72 + bottom // 56dp height + 10dp spacing + bottom inset
  if (Platform.OS === 'ios' && bottom > 0) absoluteHeight -= 16 // The iOS navigation bar is transparent and already spaced, so the 16dp is not needed

  return (
    <Content
      testID='bottom-menu-container'
      row
      absolute
      noPadding
      bottom={0}
      paddingHorizontal={8}
      size='full'
      borderTopStartRadius={24}
      borderTopEndRadius={24}
      justifyContentSpaceAround
      backgroundColor={themeConfig.colors.secondary}
      height={absoluteHeight}
      heightNormalizeBased>
      {menuItems.map((props) => (
        <BottomMenuItem key={`${props?.title ?? 'Main_'}`} {...props} />
      ))}
    </Content>
  )
}
