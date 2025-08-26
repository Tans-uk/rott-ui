import React from 'react'
import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {themeConfig} from '../../../providers'
import {Toggle} from '../components'

describe('Toggle -> Custom Component', () => {
  const toggleContainerTestId = 'toggle-container-test-id'
  const toggleTestId = 'toggle-test-id'

  it('toggle ilk render anında snapshot ile eşleşmeli', () => {
    const renderedToggle = render(<Toggle isOn={false} />)

    expect(renderedToggle).toMatchSnapshot()
  })

  it('toggle default propslar ile render olmalı', () => {
    const {getByTestId} = render(<Toggle isOn={false} />)

    const toggleContainer = getByTestId(toggleContainerTestId)
    expect(toggleContainer).toBeDefined()

    const toggleWheel = getByTestId(toggleTestId)
    expect(toggleWheel).toBeDefined()
  })

  it('tıklandığında onToggleChange çağırılmalı', async () => {
    const onToggleMock = jest.fn()
    const {getByTestId} = render(<Toggle onToggleChange={onToggleMock} isOn={false} />)

    const toggleContainer = getByTestId(toggleContainerTestId)
    fireEvent.press(toggleContainer)

    await waitFor(() => expect(onToggleMock).toHaveBeenCalled())
  })

  describe('isOn özelliği değiştiğinde stil özellikleri değişmeli', () => {
    const onToggleMock = jest.fn()

    it('pasif ise', () => {
      const {getByTestId} = render(<Toggle onToggleChange={onToggleMock} isOn={false} />)

      const toggleContainer = getByTestId(toggleTestId)

      expect(toggleContainer).toHaveStyle({
        backgroundColor: themeConfig.colors['grey-200'],
      })
    })

    it('aktif ise', () => {
      const {getByTestId} = render(<Toggle onToggleChange={onToggleMock} isOn={true} />)

      const toggleContainer = getByTestId(toggleTestId)

      expect(toggleContainer).toHaveStyle({
        backgroundColor: themeConfig.colors.primary,
      })
    })
  })
})
