import {cloneElement, type ReactElement} from 'react'

import {display} from '@utils'
import {render} from 'src/__tests__/utils/testUtils'

/*
 Dışarıdan element alınacağı için verilen elementi istenilen property ile klonlayıp öyle test etmektedir.
 cloneElement'in kullanımı için: https://stackoverflow.com/a/36750593
*/

export const commonUiTestExtension = (element: ReactElement<any>, testId: string) => {
  const elementName = (element.type as any).name

  return describe(`${elementName} -> Common UI Test`, () => {
    it(`${elementName} marginTop propertysi aldığında styleları arasında marginTop ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        marginTop: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({
        marginTop: display.normalize(10, 'width'),
      })
    })

    it(`${elementName} marginBottom propertysi aldığında styleları arasında marginBottom ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        marginBottom: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({
        marginBottom: display.normalize(10, 'width'),
      })
    })

    it(`${elementName} marginLeft propertysi aldığında styleları arasında marginLeft ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        marginLeft: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({marginLeft: display.normalize(10, 'width')})
    })

    it(`${elementName} marginRight propertysi aldığında styleları arasında marginRight ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        marginRight: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({marginRight: display.normalize(10, 'width')})
    })

    it(`${elementName} paddingTop propertysi aldığında styleları arasında paddingTop ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        paddingTop: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({
        paddingTop: display.normalize(10, 'width'),
      })
    })

    it(`${elementName} paddingBottom propertysi aldığında styleları arasında paddingBottom ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        paddingBottom: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({
        paddingBottom: display.normalize(10, 'width'),
      })
    })

    it(`${elementName} paddingLeft propertysi aldığında styleları arasında paddingLeft ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        paddingLeft: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({paddingLeft: display.normalize(10, 'width')})
    })

    it(`${elementName} paddingRight propertysi aldığında styleları arasında paddingRight ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        paddingRight: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({paddingRight: display.normalize(10, 'width')})
    })

    it(`${elementName} paddingVertical propertysi aldığında styleları arasında paddingVertical ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        paddingVertical: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({paddingVertical: display.normalize(10, 'width')})
    })

    it(`${elementName} paddingHorizontal propertysi aldığında styleları arasında paddingHorizontal ve verilen değer olmalıdır`, () => {
      const CloneElement = cloneElement(element, {
        paddingHorizontal: 10,
      })
      const {getByTestId} = render(CloneElement)

      const renderedElement = getByTestId(testId)

      expect(renderedElement).toHaveStyle({paddingHorizontal: display.normalize(10, 'width')})
    })
  })
}
