import type {FlexAlignType} from 'react-native'

import {useColorFromVariant} from '.'
import {alignItemsConvert} from '../utils/alignItemsConverter'
import {justifyContentConvert} from '../utils/justifyContentConverter'
import {sizeToPercentage} from '../utils/sizeToPercentage'
import {useDisplay} from './useDisplay'

export const useCommonUiStyleProperties = (props?: any): Record<string, any> => {
  const colorFromVariant = useColorFromVariant()
  const {normalize} = useDisplay()

  const styles: Record<string, any> = {}

  // Width handling
  if (typeof props?.width === 'number') styles.width = normalize(props?.width)
  else if (props?.size) styles.width = sizeToPercentage(props?.size)

  // Height handling
  if (typeof props?.height === 'number') {
    styles.height = normalize(props?.height, props.heightNormalizeBased ? 'height' : 'width')
  }

  // Max/Min dimensions
  if (typeof props?.maxWidth === 'number') styles.maxWidth = normalize(props?.maxWidth)

  if (typeof props?.height === 'number' || typeof props?.maxHeight === 'number') {
    styles.maxHeight = normalize(
      props?.maxHeight ?? props?.height,
      props.heightNormalizeBased ? 'height' : 'width'
    )
  }

  if (typeof props?.minWidth === 'number') styles.minWidth = normalize(props?.minWidth)

  if (typeof props?.minHeight === 'number') {
    styles.minHeight = normalize(props?.minHeight, props.heightNormalizeBased ? 'height' : 'width')
  }

  // Background color
  if (props?.backgroundColor !== undefined)
    styles.backgroundColor = colorFromVariant(props.backgroundColor)

  // Margins
  if (props?.marginTop !== undefined) {
    styles.marginTop = Number(props?.marginTop)
      ? normalize(props?.marginTop, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.marginTop
  }

  if (props?.marginBottom !== undefined) {
    styles.marginBottom = Number(props?.marginBottom)
      ? normalize(props?.marginBottom, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.marginBottom
  }

  if (props?.marginLeft !== undefined) {
    styles.marginLeft = Number(props?.marginLeft)
      ? normalize(props?.marginLeft, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginLeft
  }

  if (props?.marginRight !== undefined) {
    styles.marginRight = Number(props?.marginRight)
      ? normalize(props?.marginRight, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginRight
  }

  if (props?.marginVertical !== undefined) {
    styles.marginVertical = Number(props?.marginVertical)
      ? normalize(props?.marginVertical, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.marginVertical
  }

  if (props?.marginHorizontal !== undefined) {
    styles.marginHorizontal = Number(props?.marginHorizontal)
      ? normalize(props?.marginHorizontal, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginHorizontal
  }

  // Paddings
  if (props?.paddingTop !== undefined) {
    styles.paddingTop = Number(props?.paddingTop)
      ? normalize(props?.paddingTop, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.paddingTop
  }

  if (props?.paddingBottom !== undefined) {
    styles.paddingBottom = Number(props?.paddingBottom)
      ? normalize(props?.paddingBottom, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.paddingBottom
  }

  if (props?.paddingLeft !== undefined) {
    styles.paddingLeft = Number(props?.paddingLeft)
      ? normalize(props?.paddingLeft, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingLeft
  }

  if (props?.paddingRight !== undefined) {
    styles.paddingRight = Number(props?.paddingRight)
      ? normalize(props?.paddingRight, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingRight
  }

  if (props?.paddingVertical !== undefined) {
    styles.paddingVertical = Number(props?.paddingVertical)
      ? normalize(props?.paddingVertical, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.paddingVertical
  }

  if (props?.paddingHorizontal !== undefined) {
    styles.paddingHorizontal = Number(props?.paddingHorizontal)
      ? normalize(props?.paddingHorizontal, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingHorizontal
  }

  // Position
  // Handle position property based on provided props
  if (props?.position || props?.absolute || props?.relative) {
    if (props?.position) styles.position = props.position
    else if (props?.absolute) styles.position = 'absolute'
    else if (props?.relative) styles.position = 'relative'
  }

  if (props?.zIndex !== undefined) styles.zIndex = props.zIndex

  // Position values
  if (props?.left !== undefined) {
    styles.left = Number(props?.left)
      ? normalize(props?.left, props.heightNormalizeBased ? 'height' : 'width')
      : props?.left
  }

  if (props?.right !== undefined) {
    styles.right = Number(props?.right)
      ? normalize(props?.right, props.heightNormalizeBased ? 'height' : 'width')
      : props?.right
  }

  if (props?.top !== undefined) {
    styles.top = Number(props?.top)
      ? normalize(props?.top, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.top
  }

  if (props?.bottom !== undefined) {
    styles.bottom = Number(props?.bottom)
      ? normalize(props?.bottom, !props.heightNormalizeBased ? 'width' : 'height')
      : props?.bottom
  }

  // Flex properties
  if (Number(props?.flexGrow)) styles.flexGrow = props.flexGrow

  if (Number(props?.flexShrink)) styles.flexShrink = props.flexShrink

  if (Number(props?.gap)) styles.gap = props.gap

  // Border radius
  if (props?.includeBorderRadius) {
    if (props?.borderRadius !== undefined) styles.borderRadius = props.borderRadius

    if (props?.borderTopEndRadius !== undefined)
      styles.borderTopEndRadius = props.borderTopEndRadius

    if (props?.borderTopStartRadius !== undefined)
      styles.borderTopStartRadius = props.borderTopStartRadius

    if (props?.borderBottomStartRadius !== undefined)
      styles.borderBottomStartRadius = props.borderBottomStartRadius

    if (props?.borderBottomEndRadius !== undefined)
      styles.borderBottomEndRadius = props.borderBottomEndRadius
  }

  // Align items
  if (props?.includeAlignItems) {
    const alignItems = alignItemsConvert({
      alignItemsBaseline: props?.alignItemsBaseline,
      alignItemsCenter: props?.alignItemsCenter,
      alignItemsFlexStart: props?.alignItemsFlexStart,
      alignItemsFlexEnd: props?.alignItemsFlexEnd,
      alignItemsStretch: props?.alignItemsStretch,
    }) as FlexAlignType | undefined

    if (alignItems !== undefined) styles.alignItems = alignItems
  }

  // Justify content
  if (props?.includeJustifyContent) {
    const justifyContent = justifyContentConvert({
      justifyContentCenter: props?.justifyContentCenter,
      justifyContentFlexStart: props?.justifyContentFlexStart,
      justifyContentFlexEnd: props?.justifyContentFlexEnd,
      justifyContentSpaceAround: props?.justifyContentSpaceAround,
      justifyContentSpaceBetween: props?.justifyContentSpaceBetween,
      justifyContentSpaceEvenly: props?.justifyContentSpaceEvenly,
    }) as string | undefined

    if (justifyContent !== undefined) styles.justifyContent = justifyContent
  }

  // Letter spacing
  if (props?.includeLatterSpacing && props?.letterSpacing !== undefined)
    styles.letterSpacing = props.letterSpacing

  // Overflow
  if (props?.overflowHidden) styles.overflow = 'hidden'

  // Flex wrap
  if (props?.flexWrap) styles.flexWrap = props.flexWrap

  // Box shadow
  if (props?.boxShadow !== undefined) styles.boxShadow = props.boxShadow

  if (props?.opacity !== undefined) styles.opacity = props.opacity

  return styles
}
