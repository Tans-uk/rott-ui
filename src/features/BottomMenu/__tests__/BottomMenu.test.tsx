import {bottomMenuListItemMock} from '../__mocks__'
import {render} from '../../../../src/__tests__/utils/testUtils'
import {BottomMenu} from '../components'
import React from 'react'

describe('Component -> BottomMenu', () => {
  const testIDs = {
    bottomMenuContainerTestId: 'bottom-menu-container',
    bottomMenuItemTestId: 'bottom-menu-item-1-test-id',
    bottomMenuItemTestId2: 'bottom-menu-item-2-test-id',
  }

  it('bottom menu componenti snapshotı ile eşleşmeli', async () => {
    const rendered = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    expect(rendered).toMatchSnapshot()
  })

  it('ekranda görülmeli', async () => {
    const {getByTestId} = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)
    const bottomMenuContainer = getByTestId('bottom-menu-container')

    expect(bottomMenuContainer).toBeOnTheScreen()
  })

  it('bottom menu componenti ekranda gözükmeli', async () => {
    const {bottomMenuContainerTestId} = testIDs

    const {getByTestId} = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    const bottomMenu = getByTestId(bottomMenuContainerTestId)

    expect(bottomMenu).toBeOnTheScreen()
  })

  it('verilen menu item sayısı kadar bottom menu item componenti ekranda gözükmeli', async () => {
    const {bottomMenuItemTestId, bottomMenuItemTestId2} = testIDs

    const {getByTestId} = await render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)
    const bottomMenuItem2 = getByTestId(bottomMenuItemTestId2)

    expect(bottomMenuItem).toBeOnTheScreen()
    expect(bottomMenuItem2).toBeOnTheScreen()
  })
})
