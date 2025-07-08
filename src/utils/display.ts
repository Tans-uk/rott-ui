import {Dimensions, PixelRatio, Platform} from 'react-native'

const {height, width} = Dimensions.get('window')

const REFERENCE_DEVICE = {
  width: 390,
  height: 844,
}
const widthBaseScale = width / REFERENCE_DEVICE.width
const heightBaseScale = height / REFERENCE_DEVICE.height

/**
 * referans cihazin yuzde yukseklik donusumu
 * @param heightPercentage yukseklik yuzdesi
 * @returns yuzde girilen ifadeyi **referans cihazin** bilgilerine gore doner
 */
const setHeight = (heightPercentage: number) => (REFERENCE_DEVICE.height / 100) * heightPercentage

/**
 * referans cihazin yuzde genislik donusumu
 * @param widthPercentage genislik yuzdesi
 * @returns yuzde girilen ifadeyi **referans cihazin** bilgilerine gore doner
 */
const setWidth = (widthPercentage: number) => (REFERENCE_DEVICE.width / 100) * widthPercentage

/**
 * kullanilan cihazin yuzde yukseklik donusumu
 * @param heightPercentage yukseklik yuzdesi
 * @returns yuzde girilen ifadeyi **kullanilan cihazin gercek bilgilerine gore** doner
 */
const setHeightDevice = (heightPercentage: number) => (height / 100) * heightPercentage

/**
 * kullanilan cihazin yuzde genislik donusumu
 * @param widthPercentage genislik yuzdesi
 * @returns yuzde girilen ifadeyi **kullanilan cihazin gercek bilgilerine gore** doner
 */
const setWidthDevice = (widthPercentage: number) => (width / 100) * widthPercentage

export const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale
  const roundedSize = PixelRatio.roundToNearestPixel(newSize)

  // TODO: react-native-keyboard-controller ios'te küsüratlı değerler ile çalışmıyor.
  // Konu ile ilgili issue açıp takip edilecektir.
  return Platform.OS === 'ios' ? Math.round(roundedSize) : roundedSize
}

const px = (size: number) => {
  return normalize(size, 'width')
}

const percentage = (size: number, base: 'width' | 'height' = 'width') => {
  return base === 'width' ? setWidthDevice(size) : setHeightDevice(size)
}

const widthPixel = (size: number) => {
  return normalize(size, 'width')
}

const heightPixel = (size: number) => {
  return normalize(size, 'height')
}

const fontPixel = (size: number) => {
  return heightPixel(size)
}

const pixelSizeVertical = (size: number) => {
  return heightPixel(size)
}

const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size)
}

const setMarginHorizontal = (marginPercentage: number) => {
  const marginSize = width * (marginPercentage / 100) * widthBaseScale

  return PixelRatio.roundToNearestPixel(marginSize)
}

const setMarginVertical = (marginPercentage: number) => {
  const marginSize = width * (marginPercentage / 100) * widthBaseScale
  const verticalMarginSize = marginSize * 2

  return PixelRatio.roundToNearestPixel(verticalMarginSize)
}

const setPaddingHorizontal = (paddingPercentage: number) => {
  const paddingSize = width * (paddingPercentage / 100) * widthBaseScale

  return PixelRatio.roundToNearestPixel(paddingSize)
}

const setPaddingVertical = (paddingPercentage: number) => {
  const paddingSize = width * (paddingPercentage / 100) * widthBaseScale
  const verticalPaddingSize = paddingSize * 2

  return PixelRatio.roundToNearestPixel(verticalPaddingSize)
}

export default {
  px,
  percentage,
  setHeight,
  setWidth,
  setHeightDevice,
  setWidthDevice,
  normalize,
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  setMarginHorizontal,
  setMarginVertical,
  setPaddingHorizontal,
  setPaddingVertical,
}
