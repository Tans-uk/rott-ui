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

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedDateInput = render(
      <DateInput name='test' testID={dateInputTestId} date={currentDate} />
    )

    expect(renderedDateInput).toMatchSnapshot()
  })

  it('date inputa tıklandığında input modal olarak açılmalı', () => {
    const {getByTestId} = render(<DateInput name='test' date={currentDate} />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const dateInputModal = getByTestId(dateInputModalTestId)
    expect(dateInputModal).toBeVisible()
  })

  it('date input allowClear propertysi almadıysa değer temizleme butonu ekranda gözükmemeli.', () => {
    const {getByTestId, queryByTestId} = render(<DateInput name='test' date={currentDate} />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const clearButton = queryByTestId(dateInputClearmButtonTestId)
    expect(clearButton).toBeNull()
  })

  it('date input allowClear propertysi aldıysa Temizle butonuna tıklandığında değer temizlenmeli.', async () => {
    const onDateChangeMock = jest.fn()
    const {getByTestId, queryByTestId} = render(
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

  it('date input mode date olarak renderlanmalı', async () => {
    const {getByTestId} = render(<DateInput name='test' mode='date' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'date')
    })
  })

  it('date input mode time olarak renderlanmalı', async () => {
    const {getByTestId} = render(<DateInput name='test' mode='time' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'time')
    })
  })

  it('date input mode datetime olarak renderlanmalı', async () => {
    const {getByTestId} = render(<DateInput name='test' mode='datetime' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'datetime')
    })
  })

  it('minimum date verildikten sonra daha geçmiş bir gün seçilirse tanımlanan minimum date değer olarak atanmalı.', async () => {
    const onDateChangeMock = jest.fn()
    const {getByTestId} = render(
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

  it('maximum date verildikten sonra daha ileri bir gün seçilirse tanımlanan maximum date değer olarak atanmalı.', async () => {
    const onDateChangeMock = jest.fn(() => currentDate)
    const maxDate = new Date(currentDate)
    const {getByTestId} = render(
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
