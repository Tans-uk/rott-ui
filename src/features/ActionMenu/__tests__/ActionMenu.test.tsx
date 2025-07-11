import {ActionMenuComponent, ActionMenuHeaderComponent} from '../components'

import {fireEvent, render, waitFor} from '@utils'

const testId = {
  actionMenuTestId: 'action-menu-test-id',
  actionMenuHeaderId: 'action-menu-header-test-id',
  modalTestId: 'action-menu-modal-test-id',
  childrenTestId: (name: string) => `action-menu-data-${name}-test-id`,
  closeButtonTestId: 'action-menu-cancel-test-id',
}

const mockDetailElement = {
  titleMock: 'Test Title',
  subTitleMock: 'Test Sub Title',
}

let mockCountCheck = 0
const mockExampleList = [
  {
    name: 'para-gonder',
    title: 'Para Gonder',
    action: () => {
      mockCountCheck++
    },
  },
  {
    name: 'hesap-hareketleri-incele',
    title: 'Hesap Hareketleri Incele',
    action: () => {
      mockCountCheck++
    },
  },
  {
    name: 'fatura-ode',
    title: 'Fatura Öde',
    action: () => {
      mockCountCheck++
    },
  },
  {
    name: 'hesap-bilgilerini-paylas',
    title: 'Hesap Bilgilerini Paylaş',
    action: () => {
      mockCountCheck++
    },
  },
]

describe('ActionMenu -> Custom Component', () => {
  it('ilk render anında snapshot ile eşleşmeli', () => {
    const {actionMenuTestId} = testId
    const {titleMock, subTitleMock} = mockDetailElement

    const rendered = render(
      <ActionMenuComponent
        testID={actionMenuTestId}
        title={titleMock}
        subTitle={subTitleMock}
        data={mockExampleList}
      />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('verilen data renderlanmali', async () => {
    const {actionMenuTestId, childrenTestId} = testId
    const {titleMock, subTitleMock} = mockDetailElement

    const {getByTestId} = render(
      <ActionMenuComponent
        testID={actionMenuTestId}
        title={titleMock}
        subTitle={subTitleMock}
        data={mockExampleList}
        visible
      />
    )

    await waitFor(() => {
      mockExampleList.map((item: {name: string; title: string; action: () => void}) => {
        const element = getByTestId(childrenTestId(item.name))
        expect(element).toHaveTextContent(item.title)
      })
    })
  })

  it('verilen data actionlari calismali', () => {
    const {actionMenuTestId, childrenTestId} = testId
    const {titleMock, subTitleMock} = mockDetailElement

    const {getByTestId} = render(
      <ActionMenuComponent
        testID={actionMenuTestId}
        title={titleMock}
        subTitle={subTitleMock}
        data={mockExampleList}
        visible
      />
    )

    mockExampleList.map((item: {name: string; title: string; action: () => void}, index) => {
      const element = getByTestId(childrenTestId(item.name))
      fireEvent.press(element)

      expect(mockCountCheck).toBe(index + 1)
    })
  })
})

describe('ActionMenuHeader -> Custom Component', () => {
  it('title ve subtitle ekranda düzgün şekilde renderlanmalı', () => {
    const {actionMenuHeaderId} = testId
    const {titleMock, subTitleMock} = mockDetailElement

    const {getByTestId} = render(
      <ActionMenuHeaderComponent title={titleMock} subTitle={subTitleMock} />
    )

    const container = getByTestId(actionMenuHeaderId)

    expect(container).toHaveTextContent(titleMock + subTitleMock)
  })
})
