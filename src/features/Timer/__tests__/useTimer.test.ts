import {act} from 'react'

import {AppState} from 'react-native'

import {useTimer} from '../hooks'

import {renderHook} from '@testing-library/react-hooks'

const advanceTicks = (sec: number) => {
  for (let i = 0; i < sec; i++) act(() => jest.advanceTimersByTime(1000))
}

jest.mock('react-native', () => {
  return {
    AppState: {
      currentState: 'active',
      addEventListener: jest.fn(() => ({
        remove: jest.fn(),
      })),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn(() => 'ios'),
    },
    Dimensions: {
      get: jest.fn(() => ({width: 375, height: 667})),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  }
})

describe('Hooks -> useTimer', () => {
  const addEventListenerMock = AppState.addEventListener as jest.Mock

  const timerInitialTime = 180

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())
  it('countdown timer azalan sekilde calismali', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act & Assert
    advanceTicks(1)
    expect(result.current.time).toEqual(179)

    advanceTicks(2)
    expect(result.current.time).toEqual(177)
  })

  it('countdown timer tamamlandığında 0 olmalı', () => {
    // Arrange
    jest.runAllTicks()
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(timerInitialTime + 20)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('countdown timer calisirken stop olabilmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.stop)
    advanceTicks(20)

    // Assert
    expect(result.current.time).toEqual(170)
  })

  it('countdown timer calisirken reset olabilmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.reset)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('countdown timer calisirken restart olabilmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.restart)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime)
  })

  it('circle timer 0 olabilmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(timerInitialTime)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('circle timer 0 oldugunda yeniden baslamali', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(180)
    advanceTicks(1) // restart eder
    advanceTicks(3)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime - 3)
  })

  it('circle timer calisirken stop olabilmeli', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.stop)
    advanceTicks(20)

    // Assert
    expect(result.current.time).toEqual(170)
  })

  it('circle timer calisirken stop olmuşken tekrar start olabilmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.stop)
    advanceTicks(5)
    act(result.current.start)
    advanceTicks(10)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime - 20)
  })

  it('circle timer calisirken stop olmuşken tekrar restart olabilmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.stop)
    advanceTicks(5)
    act(result.current.restart)
    advanceTicks(10)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime - 10)
  })

  it('circle timer calisirken reset olabilmeli', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.reset)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('timer çalışırken app arka plana atıldığında doğru devam etmeli', () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    // 10 saniye bekle
    advanceTicks(10)

    // arkaplana at (inactive) 20 sn bekle
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('inactive'))
    advanceTicks(20)

    // önplana al 8 saniye bekle
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('active'))
    advanceTicks(8)

    // arkaplana at (inactive) 20 sn bekle
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('background'))
    advanceTicks(20)

    // önplana al 12 saniye bekle
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('active'))
    advanceTicks(12)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime - 70)
  })
})
