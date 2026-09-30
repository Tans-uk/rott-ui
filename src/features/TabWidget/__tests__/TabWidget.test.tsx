import React, {useEffect} from 'react'

import {Text} from 'react-native'

import {render} from '../../../__tests__/utils/testUtils'
import {TabWidget} from '../components'

/**
 * react-native-tab-view cannot render in this Jest setup: its pager reaches React Native's
 * legacy renderer, which rejects react 19.2.4 (the renderer is built for 19.1.0). The stub
 * keeps the real exports (SceneMap included) and renders the active scene through
 * renderScene, the same call TabView makes.
 */
jest.mock('react-native-tab-view', () => ({
  ...jest.requireActual('react-native-tab-view'),
  TabView: ({navigationState, renderScene}: any) =>
    renderScene({
      route: navigationState.routes[navigationState.index],
      jumpTo: () => {},
      position: {},
    }),
  TabBar: () => null,
}))

let sceneMounts = 0

const CountingScene = () => {
  useEffect(() => {
    sceneMounts += 1
  }, [])

  return <Text>First tab</Text>
}

describe('TabWidget -> Custom Component', () => {
  beforeEach(() => {
    sceneMounts = 0
  })

  it('keeps the active scene mounted across re-renders', async () => {
    const tabs = [<CountingScene key='first' />, <Text key='second'>Second tab</Text>]
    const {getByText, rerenderAsync} = await render(
      <TabWidget titles={['First', 'Second']} tabs={tabs} testID='tabs-a' />
    )

    await rerenderAsync(<TabWidget titles={['First', 'Second']} tabs={tabs} testID='tabs-b' />)

    expect(getByText('First tab')).toBeOnTheScreen()
    expect(sceneMounts).toBe(1)
  })
})
