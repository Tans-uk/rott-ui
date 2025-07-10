import {useEffect, useRef} from 'react'

type CallbackFunction = () => void

export const useInterval = (
  callback: CallbackFunction,
  delay: Nullable<number>,
  reset?: boolean
): void => {
  const savedCallback = useRef<Nullable<CallbackFunction>>(null)
  const intervalIdRef = useRef<Nullable<NodeJS.Timeout | number>>(null)

  // Store the callback function in a ref
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current()
    }

    // Clear any existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }

    // Only create a new interval if delay is not null and not in reset state
    if (delay !== null && !reset) intervalIdRef.current = setInterval(tick, delay)

    // Cleanup function to clear the interval
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
        intervalIdRef.current = null
      }
    }
  }, [delay, reset]) // Only re-run if delay or reset changes
}
