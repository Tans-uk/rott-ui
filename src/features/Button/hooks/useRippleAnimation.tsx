import React, {useCallback, useEffect, useRef, useState} from 'react'

import {GestureResponderEvent} from 'react-native'

import {Ripple} from '../components/Ripple'

interface RippleState {
  id: string
  x: number
  y: number
}

const RIPPLE_SIZE = 100
const RIPPLE_DURATION = 400

export const useRippleAnimation = () => {
  const isMounted = useRef(false)

  const [ripples, setRipples] = useState<RippleState[]>([])

  const handleRipplePressIn = useCallback((e: GestureResponderEvent) => {
    if (!isMounted.current) return

    const {locationX, locationY} = e.nativeEvent
    const rippleId = `${Date.now()}-${Math.random()}`

    const newRipple: RippleState = {
      id: rippleId,
      x: locationX,
      y: locationY,
    }

    setRipples((prev) => [...prev, newRipple])
  }, [])

  const handleRippleComplete = useCallback((rippleId: string) => {
    if (!isMounted.current) return

    setRipples((prev) => prev.filter((r) => r.id !== rippleId))
  }, [])

  const rippleElement = ripples.map((ripple) => (
    <Ripple
      key={ripple.id}
      size={RIPPLE_SIZE}
      duration={RIPPLE_DURATION}
      x={ripple.x}
      y={ripple.y}
      onComplete={() => handleRippleComplete(ripple.id)}
    />
  ))

  const rippleContainerStyles = {
    pointerEvents: 'box-only',
    overflow: 'hidden',
  }

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    rippleElement,
    rippleContainerStyles,
    handleRipplePressIn,
  }
}
