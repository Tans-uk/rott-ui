import {useContext, type FC} from 'react'

import {Platform} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useSafeArea} from '../../../hooks'
import {ThemeConfig} from '../../../models'
import {Content} from '../../Content'
import type {BottomMenuItemModel} from '../models'
import {BottomMenuItem} from './BottomMenuItem'

interface BottomMenuProps {
  menuItems: BottomMenuItemModel<ThemeConfig>[]
}

export const BottomMenu: FC<BottomMenuProps> = ({menuItems}) => {
  const {colors} = useContext(RottUiContext)
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
      backgroundColor={colors.secondary}
      height={absoluteHeight}>
      {menuItems.map((props) => (
        <BottomMenuItem key={`${props?.title ?? 'Main_'}`} {...props} />
      ))}
    </Content>
  )
}
