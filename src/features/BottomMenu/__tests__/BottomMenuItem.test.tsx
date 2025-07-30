import {bottomMenuListItemMock} from '../__mocks__'
import {render} from '../../../__tests__/utils/testUtils'
import {BottomMenuItem} from '../components'

describe('Component -> BottomMenuItem', () => {
  const testIDs = {
    bottomMenuItemTestId: 'bottom-menu-item-1-test-id',
  }

  it('bottom menu item componenti snapshot ile eşleşmeli', () => {
    const rendered = render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    expect(rendered).toMatchSnapshot()
  })

  it('bottom menu item componenti ekranda gözükmeli', () => {
    const {bottomMenuItemTestId} = testIDs

    const {getByTestId} = render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)

    expect(bottomMenuItem).toBeOnTheScreen()
  })

  it('verilen icon ekranda gözükmeli', () => {
    const {bottomMenuItemTestId} = testIDs

    const {getByTestId} = render(<BottomMenuItem {...bottomMenuListItemMock[0]} />)

    const bottomMenuItem = getByTestId(bottomMenuItemTestId)

    expect(bottomMenuItem).toBeOnTheScreen()
  })
})
