/* eslint-disable react-native/no-inline-styles */
import {useContext, type FC} from 'react'

import {RottUiContext} from '../../../contexts'
import {useDisplay} from '../../../hooks'
import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'

import {TabBar, type NavigationState, type SceneRendererProps} from 'react-native-tab-view'

interface TabWidgetItemProps<TTheme extends ThemeConfig> {
  testID?: string
  routesLength: number
  tabBarOnChange: (key: string) => void
  backgroundColor?: keyof TTheme['colors']
  disabled?: boolean
}

export const TabWidgetItem: FC<
  TabWidgetItemProps<ThemeConfig> &
    SceneRendererProps & {
      navigationState: NavigationState<{
        key: string
        title: string
      }>
    }
> = ({testID, routesLength, tabBarOnChange, backgroundColor, disabled, ...props}) => {
  const {px, percentage} = useDisplay()
  const {colors} = useContext(RottUiContext)
  backgroundColor = backgroundColor ?? colors['grey-800']

  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary, height: 3}}
      tabStyle={{
        alignContent: 'center',
        height: 56,
        borderBottomWidth: px(1),
      }}
      testID={testID}
      style={{
        marginTop: 0,
        backgroundColor: backgroundColor,
        borderBottomColor: colors['neutral-grey-alpha-200'],
        borderBottomWidth: px(1),
      }}
      renderTabBarItem={({route}) => (
        <Pressable onPress={() => !disabled && tabBarOnChange(route.key)}>
          <Item
            style={{flex: 1, width: percentage(100 / routesLength)}}
            height={56}
            justifyContentCenter
            alignItemsCenter>
            <Label
              fontSize='sm'
              fontWeight={'700'}
              fontFamily='Markpro-Bold'
              numberOfLines={1}
              color={colors.white}>
              {route.title}
            </Label>
          </Item>
        </Pressable>
      )}
      activeColor={colors.white}
      inactiveColor={colors['neutral-blue-alpha']}
    />
  )
}
