import {render} from '../../../__tests__/utils/testUtils'
import {Image} from '../components'
import type {ImageTypes} from '../models'

describe('Image -> Custom Component', () => {
  const testId = {
    imageTestId: 'image-test-id',
  }
  const testIconName: ImageTypes = 'PTTBANK_WHITE'

  it('image elementi snapshot ile eşleşmeli', () => {
    const {imageTestId} = testId
    const renderedIcon = render(
      <Image testID={imageTestId} name={testIconName} width={50} height={50} />
    )

    expect(renderedIcon).toMatchSnapshot()
  })

  it('image elementi renderlandığında gerçekten ekranda olmalı', () => {
    const {imageTestId} = testId
    const {getByTestId} = render(<Image testID={imageTestId} name={testIconName} width={50} />)

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toBeOnTheScreen()
  })

  it('image elementi verilen width ile renderlanmalı', () => {
    const {imageTestId} = testId
    const {getByTestId} = render(<Image testID={imageTestId} name={testIconName} width={50} />)

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toHaveProp('width', 50)
  })

  it('image elementi verilen height ile renderlanmalı', () => {
    const {imageTestId} = testId
    const {getByTestId} = render(<Image testID={imageTestId} name={testIconName} height={50} />)

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toHaveProp('height', 50)
  })
})
