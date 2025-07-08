import {type FC} from 'react'

import {Platform} from 'react-native'

import type {BottomMenuItemModel} from '../models'
import {BottomMenuItem} from './BottomMenuItem'

import {Content} from '@features/Content'
import {useSafeArea} from '@hooks'
import {themeConfig} from '@providers'

interface BottomMenuProps {
  menuItems: BottomMenuItemModel[]
}

export const BottomMenu: FC<BottomMenuProps> = ({menuItems}) => {
  const {bottom} = useSafeArea()

  let absoluteHeight = 64 + bottom // 56 dip yükseklik + 8 dip boşluk + bottom inset
  if (Platform.OS === 'ios' && bottom > 0) absoluteHeight -= 8 // ios'te navigation bar şeffaf ve boşluklu olduğu için 8 dip boşluğa gerek yoktur

  return (
    <Content
      testID='bottom-menu-container'
      row
      absolute
      noPadding
      bottom={0}
      paddingTop={12}
      paddingHorizontal={8}
      size='full'
      borderTopStartRadius={24}
      borderTopEndRadius={24}
      justifyContentSpaceAround
      backgroundColor={themeConfig.colors.secondary}
      height={absoluteHeight}>
      {menuItems.map((props) => (
        <BottomMenuItem key={`${props?.title ?? 'Main_'}`} {...props} />
      ))}
    </Content>
  )
}
