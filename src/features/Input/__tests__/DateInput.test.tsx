import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {DateInput} from '../components'

import {startOfDay} from 'date-fns'

describe('Date Input -> Custom Input', () => {
  const dateInputTestId = 'date-input-test-id'
  const dateInputValueContainerTestId = 'date-input-value-container'
  const dateInputConfirmButtonTestId = 'date-input-confirm-button'
  const dateInputClearmButtonTestId = 'date-input-clear-button'
  const dateInputModalTestId = 'date-input-modal'
  const currentDate = new Date()

  it('matches the snapshot on first render', async () => {
    const renderedDateInput = await render(
      <DateInput name='test' testID={dateInputTestId} date={currentDate} />
    )

    expect(renderedDateInput).toMatchSnapshot()
  })

  it('opens the date input as a modal when tapped', async () => {
    const {getByTestId} = await render(<DateInput name='test' date={currentDate} />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const dateInputModal = getByTestId(dateInputModalTestId)
    expect(dateInputModal).toBeVisible()
  })

  it('hides the clear button when the date input does not have allowClear.', async () => {
    const {getByTestId, queryByTestId} = await render(<DateInput name='test' date={currentDate} />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const clearButton = queryByTestId(dateInputClearmButtonTestId)
    expect(clearButton).toBeNull()
  })

  it('clears the value when the Clear button is tapped and the date input has allowClear.', async () => {
    const onDateChangeMock = jest.fn()
    const {getByTestId, queryByTestId} = await render(
      <DateInput
        name='test'
        value={currentDate.toDateString()} // Fix: Pass a valid date value in the format 'YYYY-MM-DD'.
        date={currentDate}
        mode='date'
        allowClear
        onDateChange={onDateChangeMock}
      />
    )

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)
    const modalElement = getByTestId(dateInputModalTestId)
    expect(modalElement).toBeVisible()
    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('date')
    })
    const clearButton = getByTestId(dateInputClearmButtonTestId)
    fireEvent.press(clearButton)

    const modalShouldNotVisible = queryByTestId(dateInputModalTestId)
    expect(modalShouldNotVisible).not.toBeOnTheScreen()
  })

  it('renders the date input in date mode', async () => {
    const {getByTestId} = await render(<DateInput name='test' mode='date' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'date')
    })
  })

  it('renders the date input in time mode', async () => {
    const {getByTestId} = await render(<DateInput name='test' mode='time' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'time')
    })
  })

  it('renders the date input in datetime mode', async () => {
    const {getByTestId} = await render(<DateInput name='test' mode='datetime' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'datetime')
    })
  })

  it('does not crash when confirming without onDateChange', async () => {
    const {getByTestId} = await render(<DateInput name='test' mode='date' date={currentDate} />)

    fireEvent.press(getByTestId(dateInputValueContainerTestId))

    const confirmButton = getByTestId(dateInputConfirmButtonTestId)
    expect(() => fireEvent.press(confirmButton)).not.toThrow()
  })

  it('clamps to the minimum date when an earlier day is selected.', async () => {
    const onDateChangeMock = jest.fn()
    const {getByTestId} = await render(
      <DateInput
        name='test'
        mode='date'
        date={new Date()}
        minimumDate={currentDate}
        onDateChange={onDateChangeMock}
      />
    )

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const dateInput = getByTestId(dateInputTestId)
    expect(dateInput).toBeOnTheScreen()
    await waitFor(() => {
      fireEvent(dateInput, 'onDateChange', new Date('2023.09.14'))

      setTimeout(() => {}, 150)
    })

    const confirmButton = getByTestId(dateInputConfirmButtonTestId)
    fireEvent.press(confirmButton)

    expect(onDateChangeMock).toHaveBeenCalledWith(startOfDay(currentDate))
  })

  it('clamps to the maximum date when a later day is selected.', async () => {
    const onDateChangeMock = jest.fn(() => currentDate)
    const maxDate = new Date(currentDate)
    const {getByTestId} = await render(
      <DateInput
        name='test'
        mode='date'
        date={currentDate}
        maximumDate={maxDate}
        onDateChange={onDateChangeMock}
      />
    )

    await waitFor(() => {
      const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)

      fireEvent.press(dateInputValueContainer)
    })

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()

      // Create a new date that's one day after the maximum date without mutating currentDate
      const futureDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
      fireEvent(dateInput, 'onDateChange', futureDate)

      const confirmButton = getByTestId(dateInputConfirmButtonTestId)
      fireEvent.press(confirmButton)
    })

    expect(onDateChangeMock).toHaveBeenCalledWith(startOfDay(maxDate))
  })
})
