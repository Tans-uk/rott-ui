import React from 'react'

import {bottomMenuListItemMock} from '../__mocks__'
import {render} from '../../../__tests__/utils/testUtils'
import {BottomMenuItem} from '../components'

describe('Component -> BottomMenuItem', () => {
  const testIDs = {
    bottomMenuItemTestId: 'bottom-menu-item-1-test-id',
  }

  it('bottom menu item componenti snapshot ile eşleşmeli', async () => {
    const rendered = await render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    expect(rendered).toMatchSnapshot()
  })

  it('bottom menu item componenti ekranda gözükmeli', async () => {
    const {bottomMenuItemTestId} = testIDs

    const {getByTestId} = await render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)

    expect(bottomMenuItem).toBeOnTheScreen()
  })

  it('verilen icon ekranda gözükmeli', async () => {
    const {bottomMenuItemTestId} = testIDs

    const {getByTestId} = await render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)

    expect(bottomMenuItem).toBeOnTheScreen()
  })
})
