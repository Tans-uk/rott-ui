import {ImageSourcePropType} from 'react-native'

interface ConsumerAssets {
  images: Record<string, ImageSourcePropType>
  icons: Record<string, ImageSourcePropType>
}

let resolved: ConsumerAssets = {images: {}, icons: {}}

try {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - virtual module provided by withRottAssets() metro wrapper
  resolved = require('@rott-consumer-assets')
} catch {
  // withRottAssets wrapper not configured — no consumer assets available
}

export const consumerAssets: ConsumerAssets = resolved
