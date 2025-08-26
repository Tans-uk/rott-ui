import React from 'react'
import {render} from '../../../__tests__/utils/testUtils'
import {Label} from '../../Label'
import {CommonItemContainer} from '../components'

describe('Common -> Common Item Container', () => {
  it('common item container ilk renderlandığında snapshot ile eşleşmeli', () => {
    const commonItemContainer = render(
      <CommonItemContainer>
        <Label>Test</Label>
      </CommonItemContainer>
    )

    expect(commonItemContainer).toMatchSnapshot()
  })

  it('common item container ilk renderlandığında children ekranda renderlanmali', () => {
    const {getByText} = render(
      <CommonItemContainer>
        <Label>Test</Label>
      </CommonItemContainer>
    )

    const labelElement = getByText('Test')

    expect(labelElement).toBeOnTheScreen()
  })
})
