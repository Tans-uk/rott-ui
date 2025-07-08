import type {BottomMenuItemModel} from '../models'

export const bottomMenuListItemMock: BottomMenuItemModel[] = [
  {
    testID: 'bottom-menu-item-1-test-id',
    title: 'Menu 1',
    icon: {
      name: 'ARROW_DOWN',
    },
    onPress: jest.fn(),
  },
  {
    testID: 'bottom-menu-item-2-test-id',
    title: 'Menu 2',
    icon: {
      name: 'ARROW_DOWN',
    },
    onPress: jest.fn(),
  },
]
