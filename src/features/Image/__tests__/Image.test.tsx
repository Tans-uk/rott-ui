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

  it('passes a local require() source through unchanged', async () => {
    const {imageTestId} = testId
    const {getByTestId} = await render(<Image testID={imageTestId} source={42} />)

    expect(getByTestId(imageTestId)).toHaveProp('source', 42)
  })

  it('passes an array of sources through unchanged', async () => {
    const {imageTestId} = testId
    const sources = [{uri: 'https://example.com/logo.png', width: 10, height: 10}]
    const {getByTestId} = await render(<Image testID={imageTestId} source={sources} />)

    expect(getByTestId(imageTestId)).toHaveProp('source', sources)
  })

  it('still asks a remote image to reload', async () => {
    const {imageTestId} = testId
    const {getByTestId} = await render(
      <Image testID={imageTestId} source={{uri: 'https://example.com/logo.png'}} />
    )

    expect(getByTestId(imageTestId)).toHaveProp('source', {
      uri: 'https://example.com/logo.png',
      cache: 'reload',
    })
  })
})
