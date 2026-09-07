import React from 'react'

import {commonUiTestExtension} from '../../../__tests__/utils/commonUiTestExtension'
import {render} from '../../../__tests__/utils/testUtils'
import {Separator} from '../components'

const testId = {
  separatorTestId: 'separator-test-id',
}

describe('Separator -> Custom Component', () => {
  it('renders the separator component and matches its snapshot', async () => {
    const rendered = await render(<Separator />)

    expect(rendered).toMatchSnapshot()
  })

  it('renders the separator component with its default style', async () => {
    const {separatorTestId} = testId
    const {getByTestId} = await render(
      <Separator testID={separatorTestId} size='full' orientation='horizontal' />
    )

    const separatorElement = getByTestId(separatorTestId)

    expect(separatorElement).toBeOnTheScreen()
    expect(separatorElement).toHaveStyle({
      height: 2, // Default height
      width: '100%', // Default width
      opacity: 1,
    })
  })

  it('renders the separator component horizontally', async () => {
    const {separatorTestId} = testId
    const {getByTestId} = await render(
      <Separator testID={separatorTestId} size='full' orientation='horizontal' height={'100%'} />
    )

    const separatorElement = getByTestId(separatorTestId)

    expect(separatorElement).toHaveStyle({width: '100%'})
  })

  it('renders the separator component vertically', async () => {
    const {getByTestId} = await render(
      <Separator orientation='vertical' testID='separator-test-id' />
    )

    const separator = getByTestId('separator-test-id')

    expect(separator).toHaveStyle({height: 2, width: 2})
  })

  it('renders the separator with the given opacity', async () => {
    const {separatorTestId} = testId
    const opacityValue = 0.5
    const {getByTestId} = await render(
      <Separator
        testID={separatorTestId}
        size='full'
        orientation='vertical'
        opacity={opacityValue}
      />
    )
    const separatorElement = getByTestId(separatorTestId)

    expect(separatorElement).toHaveStyle({opacity: opacityValue})
  })

  commonUiTestExtension(<Separator testID={testId.separatorTestId} />, testId.separatorTestId)
})
