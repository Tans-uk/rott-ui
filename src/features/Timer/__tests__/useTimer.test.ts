import {act} from 'react'

import {AppState} from 'react-native'

import {useTimer} from '../hooks'

import {renderHook} from '@testing-library/react-native'

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
  it('counts down', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act & Assert
    advanceTicks(1)
    expect(result.current.time).toEqual(179)

    advanceTicks(2)
    expect(result.current.time).toEqual(177)
  })

  it('reaches 0 when the countdown timer completes', async () => {
    // Arrange
    jest.runAllTicks()
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(timerInitialTime + 20)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('can stop the countdown timer while it runs', async () => {
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

  it('can reset the countdown timer while it runs', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.reset)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('can restart the countdown timer while it runs', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.restart)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime)
  })

  it('can reach 0 on the circle timer', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(timerInitialTime)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('restarts the circle timer when it reaches 0', async () => {
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

  it('can stop the circle timer while it runs', async () => {
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

  it('can start the circle timer again after it has been stopped', async () => {
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

  it('can restart the circle timer after it has been stopped', async () => {
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

  it('can reset the circle timer while it runs', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'circle'))
    act(result.current.start)

    // Act
    advanceTicks(10)
    act(result.current.reset)

    // Assert
    expect(result.current.time).toEqual(0)
  })

  it('keeps counting correctly when the app is backgrounded while the timer runs', async () => {
    // Arrange
    const {result} = renderHook(() => useTimer(timerInitialTime, 'countdown'))
    act(result.current.start)

    // Act
    // 10 saniye bekle
    advanceTicks(10)

    // arkaplana at (inactive) 20 sn bekle
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('inactive'))
    advanceTicks(20)

    // bring to the foreground and wait 8 seconds
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('active'))
    advanceTicks(8)

    // arkaplana at (inactive) 20 sn bekle
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('background'))
    advanceTicks(20)

    // bring to the foreground and wait 12 seconds
    act(() => addEventListenerMock.mock.calls.at(-1)[1]('active'))
    advanceTicks(12)

    // Assert
    expect(result.current.time).toEqual(timerInitialTime - 70)
  })
})
