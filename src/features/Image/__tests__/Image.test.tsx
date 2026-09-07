import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Image} from '../components'
import type {ImageTypes} from '../models'

describe('Image -> Custom Component', () => {
  const testId = {
    imageTestId: 'image-test-id',
  }
  const testIconName: ImageTypes = 'pttbank-white'

  it('matches the image element snapshot', async () => {
    const {imageTestId} = testId
    const renderedIcon = await render(
      <Image testID={imageTestId} name={testIconName} width={50} height={50} />
    )

    expect(renderedIcon).toMatchSnapshot()
  })

  it('shows the image element once rendered', async () => {
    const {imageTestId} = testId
    const {getByTestId} = await render(
      <Image testID={imageTestId} name={testIconName} width={50} />
    )

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toBeOnTheScreen()
  })

  it('renders the image element with the given width', async () => {
    const {imageTestId} = testId
    const {getByTestId} = await render(
      <Image testID={imageTestId} name={testIconName} width={50} />
    )

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toHaveProp('width', 50)
  })

  it('renders the image element with the given height', async () => {
    const {imageTestId} = testId
    const {getByTestId} = await render(
      <Image testID={imageTestId} name={testIconName} height={50} />
    )

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toHaveProp('height', 50)
  })
})
