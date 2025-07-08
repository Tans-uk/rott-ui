import {Separator} from '../components'

import {commonUiTestExtension, render} from '@utils'

const testId = {
  separatorTestId: 'separator-test-id',
}

describe('Separator -> Custom Component', () => {
  it('separator component render olmalı ve snapshot eşleşmeli', () => {
    const rendered = render(<Separator />)

    expect(rendered).toMatchSnapshot()
  })

  it('separator component default style ile render olmalı', () => {
    const {separatorTestId} = testId
    const {getByTestId} = render(
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

  it('separator component horizontal render olmalı', () => {
    const {separatorTestId} = testId
    const {getByTestId} = render(
      <Separator testID={separatorTestId} size='full' orientation='horizontal' height={'100%'} />
    )

    const separatorElement = getByTestId(separatorTestId)

    expect(separatorElement).toHaveStyle({width: '100%'})
  })

  it('separator component vertical render olmalı', () => {
    const {getByTestId} = render(<Separator orientation='vertical' testID='separator-test-id' />)

    const separator = getByTestId('separator-test-id')

    expect(separator).toHaveStyle({height: 2, width: 2})
  })

  it('seperator verilen opacity ile render olmali', () => {
    const {separatorTestId} = testId
    const opacityValue = 0.5
    const {getByTestId} = render(
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
