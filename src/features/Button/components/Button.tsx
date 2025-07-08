import {type FC} from 'react'

import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native'

import type {ButtonProps} from '../models'
import {ButtonStyles} from '../styles'
import {buttonSizeNormalizer} from '../utils'

import {Icon, type IconTypes} from '@features/Icon'
import {Image} from '@features/Image'
import {Label} from '@features/Label'
import {type Size} from '@models'
import {themeConfig} from '@providers'
import {display} from '@utils'

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  color,
  size = {height: 'lg'},
  fontWeight,
  fontFamily,
  isLoading,
  loadingText,
  flex = (typeof size === 'object' && size?.width) || typeof size === 'string' ? 0 : 1,

  borderWidth,
  borderRadius,
  borderColor,
  flexGrow,
  circle = false,

  leftImage,
  rightImage,

  leftIcon,
  rightIcon,

  height = 'full',
  width = 'full',
  justifyContentFlexEnd,
  justifyContentFlexStart,
  justifyContentSpaceAround,
  justifyContentSpaceBetween,
  justifyContentCenter = justifyContentFlexEnd ||
  justifyContentFlexStart ||
  justifyContentSpaceAround ||
  justifyContentSpaceBetween
    ? false
    : true,

  children,
  style,
  text,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={StyleSheet.flatten([
        ButtonStyles({
          variant,
          color,
          size,
          flex,
          flexGrow,
          borderWidth,
          borderRadius,
          borderColor,
          circle,
          width,
          height,
          includeJustifyContent: true,
          justifyContentCenter,
          justifyContentFlexEnd,
          justifyContentFlexStart,
          justifyContentSpaceAround,
          justifyContentSpaceBetween,
          ...props,
        }).defaultButtonStyle,
        style,
      ])}
      {...props}>
      {leftIcon && !isLoading && (
        <Icon
          {...leftIcon}
          absolute={leftIcon.absolute}
          left={leftIcon.absolute ? display.normalize(24) : undefined}
          testID='button-left-icon-test-id'
          marginRight={leftIcon.absolute ? 0 : 8}
          variant={leftIcon?.variant}
          name={leftIcon?.name as IconTypes}
          width={
            leftIcon?.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            leftIcon?.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
        />
      )}

      {leftImage && !isLoading && (
        <Image
          testID='button-left-image-test-id'
          left={leftImage.absolute ? display.normalize(24) : undefined}
          name={leftImage.name}
          absolute={leftImage.absolute}
          marginRight={leftImage.absolute ? 0 : 8}
          width={
            leftImage.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            leftImage.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          tintColor={leftImage.tintColor}
          resizeMode={leftImage.resizeMode}
        />
      )}

      {!isLoading && (
        <Label
          numberOfLines={1}
          textCenter
          fontFamily={(fontFamily ?? !fontWeight) ? 'Markpro-Bold' : undefined}
          fontSize={
            typeof size === 'object'
              ? buttonSizeNormalizer(size.height as Size).fontSize
              : buttonSizeNormalizer(size).fontSize
          }
          fontWeight={fontWeight}
          style={ButtonStyles({color, variant}).buttonTextStyle}>
          {children ?? text}
        </Label>
      )}

      {isLoading && (
        <ActivityIndicator
          color={themeConfig.colors.white}
          testID='button-loading-indicator-test-id'
        />
      )}

      {isLoading && loadingText && (
        <Label
          testID='button-loading-text-test-id'
          style={ButtonStyles({color, variant}).buttonTextStyle}
          marginLeft={8}>
          {loadingText}
        </Label>
      )}

      {rightIcon && !isLoading && (
        <Icon
          {...rightIcon}
          absolute={rightIcon.absolute}
          right={rightIcon.absolute ? display.normalize(24) : undefined}
          testID='button-right-icon-test-id'
          marginLeft={rightIcon.absolute ? 0 : 8}
          variant={rightIcon?.variant}
          name={rightIcon?.name as IconTypes}
          width={
            rightIcon.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            rightIcon.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
        />
      )}

      {rightImage && !isLoading && (
        <Image
          testID='button-right-image-test-id'
          right={rightImage.absolute ? display.normalize(24) : undefined}
          name={rightImage.name}
          absolute={rightImage.absolute}
          marginRight={rightImage.absolute ? 0 : 8}
          width={
            rightImage.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            rightImage.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          tintColor={rightImage.tintColor}
          resizeMode={rightImage.resizeMode}
        />
      )}
    </TouchableOpacity>
  )
}
