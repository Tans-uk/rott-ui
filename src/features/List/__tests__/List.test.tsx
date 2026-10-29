import React from 'react'

import {Text} from 'react-native'

import {render, waitFor} from '../../../__tests__/utils/testUtils'
import {Separator} from '../../Separator'
import {List} from '../components'

describe('List -> Custom Component', () => {
  const customSeparatorTestId = 'custom-separator-test-id'

  const data = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
  ]

  it('list matches the snapshot on first render', async () => {
    const renderedList = await render(
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

  it('does not show the separator item', async () => {
    const {queryByTestId} = await render(
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

  it('renders the list items correctly', async () => {
    const {getByText} = await render(
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

  it('renders the list correctly once items arrive', async () => {
    const {getByText} = await render(
      <List data={data} renderSeparator={true} renderItem={({item}) => <Text>{item.name}</Text>} />
    )

    for (const item of data) {
      await waitFor(() => {
        const itemText = getByText(item.name)
        expect(itemText).toBeDefined()
      })
    }
  })

  it('renders the loading skeleton for a fractional estimatedItemSize', async () => {
    await expect(
      render(<List isLoading estimatedItemSize={55.5} data={[]} renderItem={() => null} />)
    ).resolves.toBeTruthy()
  })
})

describe('List -> loading skeleton', () => {
  const skeleton = <Text testID='skeleton-row'>loading</Text>

  it('renders skeletonCount rows', async () => {
    const {getAllByTestId} = await render(
      <List isLoading skeletonCount={3} listSkeletonItem={skeleton} data={[]} renderItem={null} />
    )

    expect(getAllByTestId('skeleton-row')).toHaveLength(3)
  })

  it('takes skeletonCount over estimatedItemSize', async () => {
    const {getAllByTestId} = await render(
      <List
        isLoading
        skeletonCount={2}
        estimatedItemSize={5}
        listSkeletonItem={skeleton}
        data={[]}
        renderItem={null}
      />
    )

    expect(getAllByTestId('skeleton-row')).toHaveLength(2)
  })

  it('falls back to estimatedItemSize when skeletonCount is not set', async () => {
    const {getAllByTestId} = await render(
      <List
        isLoading
        estimatedItemSize={4}
        listSkeletonItem={skeleton}
        data={[]}
        renderItem={null}
      />
    )

    expect(getAllByTestId('skeleton-row')).toHaveLength(4)
  })

  it('renders at least one row, not the empty state, for a zero skeletonCount', async () => {
    const {getAllByTestId, queryByTestId} = await render(
      <List isLoading skeletonCount={0} listSkeletonItem={skeleton} data={[]} renderItem={null} />
    )

    expect(getAllByTestId('skeleton-row')).toHaveLength(1)
    expect(queryByTestId('list-empty-test-id')).toBeNull()
  })

  it('renders one row when neither is set', async () => {
    const {getAllByTestId} = await render(
      <List isLoading listSkeletonItem={skeleton} data={[]} renderItem={null} />
    )

    expect(getAllByTestId('skeleton-row')).toHaveLength(1)
  })
})

// The render result's tree nodes are untyped (react-test-renderer ships no types).
type RenderedNode = {type: unknown; props: {children?: unknown}}

describe('List -> header and footer', () => {
  const data = [{id: 1, name: 'Item 1'}]
  const renderItem = ({item}: {item: {name: string}}) => <Text>{item.name}</Text>

  it('renders the consumer header and footer next to the separators', async () => {
    const {getByText, UNSAFE_getAllByType} = await render(
      <List
        data={data}
        renderItem={renderItem}
        headerSeparator
        footerSeparator
        ListHeaderComponent={<Text>Header</Text>}
        ListFooterComponent={() => <Text>Footer</Text>}
      />
    )

    expect(getByText('Header')).toBeTruthy()
    expect(getByText('Footer')).toBeTruthy()
    expect(UNSAFE_getAllByType(Separator)).toHaveLength(2)
  })

  it('puts the header separator between the header and the items', async () => {
    const {UNSAFE_root} = await render(
      <List
        data={data}
        renderItem={renderItem}
        headerSeparator
        ListHeaderComponent={<Text>Header</Text>}
      />
    )

    // findAll walks the tree depth-first, so the result follows render order.
    const order = UNSAFE_root.findAll(
      (node: RenderedNode) => node.type === Separator || node.type === Text
    ).map((node: RenderedNode) => (node.type === Separator ? 'separator' : node.props.children))

    expect(order).toEqual(['Header', 'separator', 'Item 1'])
  })

  it('renders the consumer header alone when headerSeparator is off', async () => {
    const {getByText, UNSAFE_queryAllByType} = await render(
      <List data={data} renderItem={renderItem} ListHeaderComponent={<Text>Header</Text>} />
    )

    expect(getByText('Header')).toBeTruthy()
    expect(UNSAFE_queryAllByType(Separator)).toHaveLength(0)
  })

  it('updates a consumer header and footer in place when the separators are on', async () => {
    const mounts = jest.fn()
    const Header = ({count}: {count: number}) => {
      React.useEffect(() => {
        mounts()
      }, [])

      return <Text>{`${count} results`}</Text>
    }
    const renderList = (items: typeof data) => (
      <List
        data={items}
        renderItem={renderItem}
        headerSeparator
        footerSeparator
        ListHeaderComponent={<Header count={items.length} />}
        ListFooterComponent={<Text>{`Footer ${items.length}`}</Text>}
      />
    )

    const {getByText, queryByText, rerenderAsync} = await render(renderList(data))
    await rerenderAsync(renderList([...data, {id: 2, name: 'Item 2'}]))

    expect(getByText('2 results')).toBeTruthy()
    expect(queryByText('1 results')).toBeNull()
    expect(getByText('Footer 2')).toBeTruthy()
    expect(mounts).toHaveBeenCalledTimes(1)
  })

  it('passes separator prop changes to the header and footer separators', async () => {
    const renderList = (separatorVariant: 'neutral-alpha-200' | 'danger') => (
      <List
        data={data}
        renderItem={renderItem}
        headerSeparator
        footerSeparator
        separatorVariant={separatorVariant}
      />
    )

    const {UNSAFE_getAllByType, rerenderAsync} = await render(renderList('neutral-alpha-200'))
    await rerenderAsync(renderList('danger'))

    const variants = UNSAFE_getAllByType(Separator).map(
      (separator: RenderedNode) => (separator.props as {variant?: string}).variant
    )

    expect(variants).toEqual(['danger', 'danger'])
  })
})
