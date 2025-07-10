import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {AppState, type AppStateStatus} from 'react-native'

export const useTimer = (initialTime: number, type: 'countdown' | 'circle' = 'countdown') => {
  const [time, setTime] = useState(initialTime)
  const [counting, setCounting] = useState(false)
  const [finished, setFinished] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | number | null>(null)
  const appState = useRef(AppState.currentState)
  const outDate = useRef<Nullable<Date>>(null)

  // Clear any existing interval to prevent memory leaks
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Start timer function
  const start = useCallback(() => {
    setCounting(true)
    setFinished(false)
  }, [])

  // Stop timer function
  const stop = useCallback(() => {
    setCounting(false)
    setFinished(true)
  }, [])

  // Reset timer function
  const reset = useCallback(() => {
    clearTimerInterval()
    setTime(0)
    setCounting(false)
    setFinished(true)
  }, [clearTimerInterval])

  // Restart timer function
  const restart = useCallback(() => {
    clearTimerInterval()
    setTime(initialTime)
    setCounting(true)
    setFinished(false)
  }, [initialTime, clearTimerInterval])

  // Update time function for external use
  const updateTime = useCallback((newTime: number) => {
    setTime(newTime)
  }, [])

  // Core timer logic in a single useEffect
  useEffect(() => {
    // Only set up interval if counting
    if (counting && !finished) {
      clearTimerInterval()

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            if (type === 'countdown') {
              clearTimerInterval()
              setCounting(false)
              setFinished(true)

              return 0
            } else if (type === 'circle') return initialTime
          }

          return prevTime - 1
        })
      }, 1000)
    } else clearTimerInterval()

    // Clean up on unmount or when dependencies change
    return () => clearTimerInterval()
  }, [counting, finished, initialTime, type, clearTimerInterval])

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        outDate.current
      ) {
        // Arka Plandan Gelme Zamanini Hesapla
        const now = new Date()
        const diff = now.getTime() - outDate.current.getTime()
        const newTime = time - Math.round(diff / 1000)

        if (newTime > 0) {
          setTime(newTime)
          start()
        } else if (type === 'countdown') reset()
        else restart()
        outDate.current = null
      } else if (nextAppState.match(/inactive|background/)) {
        // Arka Plana Atilma Zamanini Kaydet
        outDate.current = new Date()
        stop()
      }
      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [time, type, start, stop, reset, restart])

  // Preserve referential equality of the returned object
  return useMemo(
    () => ({
      time,
      reset,
      restart,
      setTime: updateTime,
      start,
      stop,
      finished,
    }),
    [time, reset, restart, updateTime, start, stop, finished]
  )
}
