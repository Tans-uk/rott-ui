import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Label} from '../components'

describe('Label -> text prop', () => {
  it('renders the text prop when no children are passed', async () => {
    const {getByText} = await render(<Label text='Görünür' />)

    expect(getByText('Görünür')).toBeTruthy()
  })

  it('renders children when both text and children are passed', async () => {
    const {getByText, queryByText} = await render(<Label text='FromText'>FromChildren</Label>)

    expect(getByText('FromChildren')).toBeTruthy()
    expect(queryByText('FromText')).toBeNull()
  })

  it('renders children when no text prop is passed', async () => {
    const {getByText} = await render(<Label>OnlyChildren</Label>)

    expect(getByText('OnlyChildren')).toBeTruthy()
  })
})
