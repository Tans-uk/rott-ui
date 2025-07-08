/* eslint-disable react-native/no-inline-styles */
import {type FC} from 'react'

import {Item} from '@features/Item'
import {Label} from '@features/Label'
import {Pressable} from '@features/Pressable'
import {themeConfig} from '@providers'
import {display} from '@utils'

import {TabBar, type NavigationState, type SceneRendererProps} from 'react-native-tab-view'

interface TabWidgetItemProps {
  testID?: string
  routesLength: number
  tabBarOnChange: (key: string) => void
  backgroundColor?: string
  disabled?: boolean
}

export const TabWidgetItem: FC<
  TabWidgetItemProps &
    SceneRendererProps & {
      navigationState: NavigationState<{
        key: string
        title: string
      }>
    }
> = ({
  testID,
  routesLength,
  tabBarOnChange,
  backgroundColor = themeConfig.colors['grey-800'],
  disabled,
  ...props
}) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: themeConfig.colors.primary, height: 3}}
      tabStyle={{
        alignContent: 'center',
        height: 56,
        borderBottomWidth: display.px(1),
      }}
      testID={testID}
      style={{
        marginTop: 0,
        backgroundColor: backgroundColor,
        borderBottomColor: themeConfig.colors['neutral-grey-alpha-200'],
        borderBottomWidth: display.px(1),
      }}
      renderTabBarItem={({route}) => (
        <Pressable onPress={() => !disabled && tabBarOnChange(route.key)}>
          <Item
            style={{flex: 1, width: display.percentage(100 / routesLength)}}
            height={56}
            justifyContentCenter
            alignItemsCenter>
            <Label
              fontSize='sm'
              fontWeight={700}
              fontFamily='Markpro-Bold'
              numberOfLines={1}
              color={themeConfig.colors.white}>
              {route.title}
            </Label>
          </Item>
        </Pressable>
      )}
      activeColor={themeConfig.colors.white}
      inactiveColor={themeConfig.colors['neutral-blue-alpha']}
    />
  )
}
