import {useState, type FC} from 'react'

import {useDisplay} from '../../../hooks'
import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import {type TabWidgetProps} from '../models'
import {TabWidgetItem} from './TabWidgetItem'

import {SceneMap, TabView} from 'react-native-tab-view'

export const TabWidget: FC<TabWidgetProps<ThemeConfig>> = ({
  titles,
  tabs,
  testID = 'tabview-test-id',
  flex = 1,
  onTabChange,
  defaultIndex = 0,
  swipeEnabled = true,
  backgroundColor,
  disabled = false,
  ...props
}) => {
  const {percentage} = useDisplay()
  const [index, setIndex] = useState(defaultIndex)
  const routes = Array.from(titles).map((title, routeIndex) => ({
    key: routeIndex.toString(),
    title,
  }))

  const tabBarOnChange = (key: string) => {
    const changedIndex = routes.findIndex((route) => route.key === key)
    !!onTabChange && onTabChange(changedIndex)
    setIndex(changedIndex)
  }

  const handleOnIndexChange = (tabIndex: number) => {
    !!onTabChange && onTabChange(tabIndex)
    setIndex(tabIndex)
  }

  return (
    <Item flex={flex} testID={testID} {...props}>
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap(
          titles.reduce((acc, _cur, curIndex) => {
            return {...acc, [curIndex.toString()]: () => tabs?.[curIndex] ?? <></>}
          }, {})
        )}
        renderTabBar={(tabBarProps) => (
          <TabWidgetItem
            disabled={disabled}
            backgroundColor={backgroundColor}
            routesLength={routes.length}
            tabBarOnChange={tabBarOnChange}
            {...tabBarProps}
          />
        )}
        onIndexChange={handleOnIndexChange}
        initialLayout={{width: percentage(100)}}
        swipeEnabled={swipeEnabled && !disabled}
      />
    </Item>
  )
}
