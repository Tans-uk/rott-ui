import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {InputLabel} from '../components/InputLabel'

describe('InputLabel', () => {
  const testIds = {
    inputLabelTestId: 'input-label-test-id',
    inputLabelDescriptionTestId: 'input-label-description-test-id',
    inputLabelIconTestId: 'input-label-description-icon-test-id',
  }
  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInputLabel = render(<InputLabel text='Test Label' />)

    expect(renderedInputLabel).toMatchSnapshot()
  })

  describe('InputLabel -> Description', () => {
    it('description verilen değerler ile ekranda görünmeli', () => {
      const {inputLabelDescriptionTestId} = testIds
      const {getByTestId} = render(<InputLabel text='Test Label' description='Test Description' />)
      const inputLabelDescription = getByTestId(inputLabelDescriptionTestId)

      expect(inputLabelDescription).toBeOnTheScreen()
    })

    it('description verilen değerler ile ekranda görünmemeli', () => {
      const {inputLabelDescriptionTestId} = testIds
      const {queryByTestId} = render(<InputLabel text='Test Label' />)
      const inputLabelDescription = queryByTestId(inputLabelDescriptionTestId)

      expect(inputLabelDescription).not.toBeOnTheScreen()
    })
  })

  describe('InputLabel -> Icon', () => {
    it('icon verilen değerler ile ekranda görünmeli', () => {
      const {inputLabelIconTestId} = testIds
      const {getByTestId} = render(<InputLabel text='Test Label' icon={{name: 'INFORMATION'}} />)
      const inputLabelIcon = getByTestId(inputLabelIconTestId)

      expect(inputLabelIcon).toBeOnTheScreen()
    })

    it('icon verilen değerler ile ekranda görünmemeli', () => {
      const {inputLabelIconTestId} = testIds
      const {queryByTestId} = render(<InputLabel text='Test Label' />)
      const inputLabelIcon = queryByTestId(inputLabelIconTestId)

      expect(inputLabelIcon).not.toBeOnTheScreen()
    })
  })
})
