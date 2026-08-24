import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {themeConfig} from '../../../providers'
import {Toggle} from '../components'

describe('Toggle -> Custom Component', () => {
  const toggleContainerTestId = 'toggle-container-test-id'
  const toggleTestId = 'toggle-test-id'

  it('toggle matches the snapshot on first render', async () => {
    const renderedToggle = await render(<Toggle isOn={false} />)

    expect(renderedToggle).toMatchSnapshot()
  })

  it('renders the toggle with its default props', async () => {
    const {getByTestId} = await render(<Toggle isOn={false} />)

    const toggleContainer = getByTestId(toggleContainerTestId)
    expect(toggleContainer).toBeDefined()

    const toggleWheel = getByTestId(toggleTestId)
    expect(toggleWheel).toBeDefined()
  })

  it('calls onToggleChange when tapped', async () => {
    const onToggleMock = jest.fn()
    const {getByTestId} = await render(<Toggle onToggleChange={onToggleMock} isOn={false} />)

    const toggleContainer = getByTestId(toggleContainerTestId)
    fireEvent.press(toggleContainer)

    await waitFor(() => expect(onToggleMock).toHaveBeenCalled())
  })

  describe('changes the style when the isOn prop changes', () => {
    const onToggleMock = jest.fn()

    it('when inactive', async () => {
      const {getByTestId} = await render(<Toggle onToggleChange={onToggleMock} isOn={false} />)

      const toggleContainer = getByTestId(toggleTestId)

      expect(toggleContainer).toHaveStyle({
        backgroundColor: themeConfig.colors['grey-200'],
      })
    })

    it('when active', async () => {
      const {getByTestId} = await render(<Toggle onToggleChange={onToggleMock} isOn={true} />)

      const toggleContainer = getByTestId(toggleTestId)

      expect(toggleContainer).toHaveStyle({
        backgroundColor: themeConfig.colors.primary,
      })
    })
  })
})
