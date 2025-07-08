import {Text} from 'react-native'

import {List} from '../components'

import {render, waitFor} from '@utils'

describe('List -> Custom Component', () => {
  const customSeparatorTestId = 'custom-separator-test-id'

  const data = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
  ]

  it('list ilk render anında snapshot ile eşleşmeli', () => {
    const renderedList = render(
      <List
        data={data}
        estimatedItemSize={100}
        renderSeparator={true}
        separatorWidth={2}
        separatorHeight={20}
        renderItem={undefined}
      />
    )

    expect(renderedList).toMatchSnapshot()
  })

  it('separator item ekranda olmamalı', () => {
    const {queryByTestId} = render(
      <List
        data={data}
        estimatedItemSize={100}
        renderSeparator={false}
        separatorWidth={2}
        separatorHeight={20}
        renderItem={undefined}
      />
    )

    const separator = queryByTestId(customSeparatorTestId)

    expect(separator).toBeNull()
  })

  it('list componenti elemanları doğru şekilde renderlamalı', () => {
    const {getByText} = render(
      <List
        data={data}
        horizontal={false}
        numColumns={1}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    )

    data.forEach((itemText) => {
      const itemElement = getByText(itemText.name)
      expect(itemElement).toBeDefined()
    })
  })

  it('list componenti eleman geldiğinde doğru renderlanmalı', async () => {
    const {getByText} = render(
      <List data={data} renderSeparator={true} renderItem={({item}) => <Text>{item.name}</Text>} />
    )

    for (const item of data) {
      await waitFor(() => {
        const itemText = getByText(item.name)
        expect(itemText).toBeDefined()
      })
    }
  })
})
