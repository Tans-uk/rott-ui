import React from 'react'
import {render} from '../../../__tests__/utils/testUtils'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Skeleton} from '../components'
import type {SkeletonStyleProps} from '../models'

const testId = {
  itemTestId: 'item-test-id',
  skeletonTestId: 'skeleton-test-id',
}

const skeletonStyle: SkeletonStyleProps = {
  width: 80,
  height: 16,
}

const DummyText = 'Test Content Text'

describe('Skeleton -> Custom Component', () => {
  it('skeleton snapshotı ile eşleşmeli', async () => {
    const {skeletonTestId} = testId
    const {width, height} = skeletonStyle
    const rendered = await render(
      <Skeleton testID={skeletonTestId} show={true} width={width} height={height} />
    )
    expect(rendered).toMatchSnapshot()
  })

  it('item icerisinde cagirilan skeleton icin snapshot eslesmeli', async () => {
    const {itemTestId, skeletonTestId} = testId
    const rendered = await render(
      <Item
        testID={itemTestId}
        skeletonTestID={skeletonTestId}
        skeletonStyle={skeletonStyle}
        skeletonShow>
        <Label>{DummyText}</Label>
      </Item>
    )
    expect(rendered).toMatchSnapshot()
  })

  it('skeleton skeletonShow true ise skeleton ekranda olmali', async () => {
    const {itemTestId, skeletonTestId} = testId
    const {getByTestId} = await render(
      <Item
        testID={itemTestId}
        skeletonTestID={skeletonTestId}
        skeletonStyle={skeletonStyle}
        skeletonShow>
        <Label>{DummyText}</Label>
      </Item>
    )

    const skeleton = getByTestId(skeletonTestId)
    expect(skeleton).toBeOnTheScreen()
  })

  it('skeleton skeletonShow true ise content ekranda olmamali', async () => {
    const {itemTestId, skeletonTestId} = testId
    const {queryByTestId} = await render(
      <Item
        testID={itemTestId}
        skeletonTestID={skeletonTestId}
        skeletonStyle={skeletonStyle}
        skeletonShow>
        <Label>{DummyText}</Label>
      </Item>
    )

    const content = queryByTestId(DummyText)
    expect(content).not.toBeOnTheScreen()
  })

  it('skeleton skeletonShow false ise skeleton ekranda olmamali', async () => {
    const {itemTestId, skeletonTestId} = testId
    const {queryByTestId} = await render(
      <Item
        testID={itemTestId}
        skeletonTestID={skeletonTestId}
        skeletonStyle={skeletonStyle}
        skeletonShow={false}>
        <Label>{DummyText}</Label>
      </Item>
    )

    const skeleton = queryByTestId(skeletonTestId)
    expect(skeleton).not.toBeOnTheScreen()
  })

  it('skeleton skeletonShow false ise content ekranda olmali', async () => {
    const {itemTestId, skeletonTestId} = testId
    const {getByText} = await render(
      <Item
        testID={itemTestId}
        skeletonTestID={skeletonTestId}
        skeletonStyle={skeletonStyle}
        skeletonShow={false}>
        <Label>{DummyText}</Label>
      </Item>
    )

    const content = getByText(DummyText)
    expect(content).toBeOnTheScreen()
  })
})
