/* eslint-disable react-native/no-inline-styles */
import {isValidElement, memo, type FC} from 'react'

import {themeConfig} from '../../../providers'
import {colorFromVariant} from '../../../utils'
import {Icon, type IconProps} from '../../Icon'
import {CheckBoxInput} from '../../Input'
import {Item} from '../../Item'
import {Label, type LabelProps} from '../../Label'
import {Pressable} from '../../Pressable'
import type {CommonItemProps} from '../models'
import {CommonItemContainer} from './CommonItemContainer'

/**
 *  Common Item Component
 * @param width - Item Genişliği
 * @param height - Item Yüksekliği
 * @param backgroundColor - Item Arka Plan Rengi varsayilan degeri `green-vogue`
 *
 * @param leftIcon - Solda renderlanacak icon, iconProps objesi alabilir, string olabilir veya react elementi alabilir
 * @param rightIcon - Sağda renderlanacak icon, iconProps objesi alabilir, string olabilir veya react elementi alabilir
 *
 * @param title - Başlık **Zorunlu**
 * @param subTitle - Alt Başlık
 * @param description - Açıklama
 *
 * @param showSelected - Seçili Gösterilsin mi
 * @param selectedPosition - Seçili Gösterim Pozisyonu
 * @param selected - Seçili mi
 * @param swipeable - Kaydirma Efekti
 * @param renderRightActions - Kaydirma Efektinde Sag Tarafta Renderlanacak Item Degerleri
 * @param renderLeftActions - Kaydirma Efektinde Sol Tarafta Renderlanacak Item Degerleri
 * @param onPress - Tıklandığında Alacağı Fonksiyon
 *
 * @returns Standart List Item Renderlar
 */
export const CommonItem: FC<CommonItemProps> = memo(
  ({
    testID,
    width,
    height,
    backgroundColor = 'grey-200',

    leftIcon,
    rightIcon,

    title,
    subTitle,
    description,

    selectedPosition,
    selectedIconType = 'radio',
    selected = false,
    showSelected = false,
    selectionDisabled,

    paddingVertical,
    paddingHorizontal,

    onPress,
    value,
    ...props
  }) => {
    return (
      <CommonItemContainer width={width} height={height}>
        <Pressable
          testID={testID}
          backgroundColor={colorFromVariant(backgroundColor)}
          disabled={selectionDisabled}
          onPress={() => !!onPress && onPress(value)}
          overflowHidden
          paddingVertical={paddingVertical ?? 16}
          paddingHorizontal={paddingHorizontal ?? 16}
          width={width}
          height={height}
          {...props}>
          <Item row alignItemsCenter justifyContentCenter flex={1}>
            {showSelected &&
              selectedPosition === 'left' &&
              selectedIconType === 'radio' &&
              !leftIcon && (
                <Item
                  width={24}
                  height={24}
                  marginRight={8}
                  borderRadius={24}
                  borderWidth={2}
                  borderColor={
                    selected ? themeConfig.colors.primary : themeConfig.colors['grey-200']
                  }
                  justifyContentCenter
                  alignItemsCenter>
                  {(selected || selectionDisabled) && (
                    <Item
                      width={selected ? 16 : 24}
                      height={selected ? 16 : 24}
                      borderRadius={13}
                      backgroundColor={
                        selected ? themeConfig.colors.primary : themeConfig.colors['grey-200']
                      }
                      style={{
                        shadowColor: selected
                          ? themeConfig.colors['neutral-blue-soft']
                          : themeConfig.colors['grey-200'],
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: selected ? 1 : 0,
                        shadowRadius: 1,
                        borderWidth: 2,
                        borderColor: selected
                          ? themeConfig.colors['neutral-blue-soft']
                          : themeConfig.colors['grey-200'],
                      }}
                    />
                  )}
                </Item>
              )}

            {/* Left Checkbox / Element */}
            {showSelected &&
              selectedPosition === 'left' &&
              selectedIconType === 'check' &&
              !leftIcon && (
                <CheckBoxInput
                  name='checkBox'
                  variant='primary'
                  marginRight={8}
                  checked={selected}
                  disabled={selectionDisabled}
                  onCheckChange={() => !!onPress && onPress!(value)}
                />
              )}
            {/* Left Checkbox / Element */}

            {/* Left Icon / Element */}
            {selectedPosition !== 'left' && leftIcon && (
              <Pressable
                testID='left-icon-test-id'
                flex={0}
                marginRight={8}
                disabled={selectionDisabled}
                onPress={(event) => {
                  !!(leftIcon as IconProps)?.onPress && (leftIcon as IconProps)?.onPress?.(event)

                  !!onPress && !(leftIcon as IconProps)?.onPress && onPress()
                }}
                {...(typeof leftIcon === 'object' ? {...leftIcon} : null)}
                key={undefined}>
                {isValidElement(leftIcon) && <>{leftIcon}</>}
                {!isValidElement(leftIcon) && (
                  <Item width={24} height={24}>
                    <Icon
                      width={24}
                      height={24}
                      variant={(leftIcon as IconProps)?.variant ?? 'grey-900'}
                      mode={(leftIcon as IconProps)?.mode}
                      noStroke={(leftIcon as IconProps)?.noStroke}
                      {...(typeof leftIcon === 'object' ? (leftIcon as IconProps) : {})}
                      name={(leftIcon as IconProps)?.name ?? leftIcon}
                    />
                  </Item>
                )}
              </Pressable>
            )}
            {/* Left Icon / Element */}

            {/* Middle Section / Title, Subtitle, Description */}
            <Item flex={1}>
              {isValidElement(title) && <>{title}</>}
              {!isValidElement(title) && (
                <>
                  {(((title as LabelProps)?.text && (title as LabelProps)?.text !== '') ||
                    (typeof title === 'string' && title !== '')) && (
                    <Label
                      testID='title-test-id'
                      variant={(title as LabelProps)?.variant ?? 'grey-900'}
                      fontSize={(title as LabelProps)?.fontSize ?? 'lg'}
                      fontFamily={(title as LabelProps)?.fontFamily}
                      fontWeight={(title as LabelProps)?.fontWeight ?? 600}
                      size={(title as LabelProps)?.size ?? 'full'}
                      {...(typeof title === 'object' ? {...title} : null)}>
                      {typeof title === 'string' ? title : (title as LabelProps)?.text}
                    </Label>
                  )}

                  {(!(title as LabelProps)?.text || title === '') && (
                    <Item
                      height={16}
                      skeletonShow
                      skeletonNoAnimation
                      skeletonStyle={{
                        width: 223,
                        height: 16,
                      }}
                    />
                  )}
                </>
              )}

              {subTitle && (
                <>
                  {isValidElement(subTitle) && <>{subTitle}</>}
                  {!isValidElement(subTitle) && (
                    <>
                      {(((subTitle as LabelProps)?.text && (subTitle as LabelProps)?.text !== '') ||
                        (typeof subTitle === 'string' && subTitle !== '')) && (
                        <Label
                          testID='subtitle-test-id'
                          variant={(subTitle as LabelProps)?.variant ?? 'grey-900'}
                          fontSize={(subTitle as LabelProps)?.fontSize ?? 'md'}
                          fontFamily={(subTitle as LabelProps)?.fontFamily ?? 'Markpro-Medium'}
                          fontWeight={(subTitle as LabelProps)?.fontWeight ?? 600}
                          marginTop={(subTitle as LabelProps)?.marginTop ?? 8}
                          {...(typeof subTitle === 'object' ? {...subTitle} : null)}>
                          {typeof subTitle === 'string' ? subTitle : (subTitle as LabelProps)?.text}
                        </Label>
                      )}

                      {(!(subTitle as LabelProps)?.text || subTitle === '') && (
                        <Item
                          marginTop={8}
                          height={16}
                          skeletonShow
                          skeletonNoAnimation
                          skeletonStyle={{
                            width: 160,
                            height: 16,
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {description && (
                <Item>
                  {isValidElement(description) && <>{description}</>}
                  {!isValidElement(description) && (
                    <Label
                      testID='description-test-id'
                      variant={(description as LabelProps)?.variant ?? 'grey-900'}
                      fontSize={(description as LabelProps)?.fontSize ?? 'md'}
                      fontFamily={(description as LabelProps)?.fontFamily ?? 'Markpro-Medium'}
                      fontWeight={(description as LabelProps)?.fontWeight ?? 600}
                      marginTop={(description as LabelProps)?.marginTop ?? 8}
                      {...(typeof description === 'object' ? {...description} : null)}>
                      {typeof description === 'string'
                        ? description
                        : (description as LabelProps)?.text}
                    </Label>
                  )}
                </Item>
              )}
            </Item>
            {/* Middle Section / Title, Subtitle, Description */}

            {/* Right Icon / Element */}
            {selectedPosition !== 'right' && rightIcon && (
              <Pressable
                testID='right-icon-test-id'
                flex={0}
                marginLeft={(rightIcon as IconProps)?.marginLeft ?? 16}
                {...(typeof rightIcon === 'object' ? {...rightIcon} : null)}
                key={undefined}
                disabled={selectionDisabled}
                onPress={(event) => {
                  !!(rightIcon as IconProps)?.onPress && (rightIcon as IconProps)?.onPress?.(event)

                  !!onPress && !(rightIcon as IconProps)?.onPress && onPress()
                }}>
                {!showSelected && isValidElement(rightIcon) && <>{rightIcon}</>}
                {!showSelected && !isValidElement(rightIcon) && (
                  <Item width={24} height={24}>
                    <Icon
                      width={24}
                      height={24}
                      variant={(rightIcon as IconProps).variant ?? 'grey-900'}
                      mode={(rightIcon as IconProps).mode}
                      noStroke={(rightIcon as IconProps).noStroke}
                      {...(typeof rightIcon === 'object' ? (rightIcon as IconProps) : {})}
                      name={(rightIcon as IconProps).name ?? rightIcon}
                    />
                  </Item>
                )}
              </Pressable>
            )}
            {/* Right Icon / Element */}

            {/* Right Radio / Element */}
            {showSelected &&
              selectedPosition === 'right' &&
              selectedIconType === 'radio' &&
              !rightIcon && (
                <Item
                  width={24}
                  height={24}
                  marginLeft={8}
                  borderRadius={24}
                  borderWidth={2}
                  borderColor={
                    selected ? themeConfig.colors.primary : themeConfig.colors['grey-200']
                  }
                  justifyContentCenter
                  alignItemsCenter>
                  {(selected || selectionDisabled) && (
                    <Item
                      width={selected ? 16 : 24}
                      height={selected ? 16 : 24}
                      borderRadius={13}
                      backgroundColor={
                        selected ? themeConfig.colors.primary : themeConfig.colors['grey-200']
                      }
                      style={{
                        shadowColor: selected
                          ? themeConfig.colors['neutral-blue-soft']
                          : themeConfig.colors['grey-200'],
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: selected ? 1 : 0,
                        shadowRadius: 1,
                        borderWidth: 2,
                        borderColor: selected
                          ? themeConfig.colors['neutral-blue-soft']
                          : themeConfig.colors['grey-200'],
                      }}
                    />
                  )}
                </Item>
              )}
            {/* Right Radio / Element */}

            {/* Right Checkbox / Element */}
            {showSelected &&
              selectedPosition === 'right' &&
              selectedIconType === 'check' &&
              !rightIcon && (
                <CheckBoxInput
                  name='checkBox'
                  variant='primary'
                  checked={selected}
                  disabled={selectionDisabled}
                  onCheckChange={() => !!onPress && onPress(value)}
                />
              )}
            {/* Right Checkbox / Element */}
          </Item>
        </Pressable>
      </CommonItemContainer>
    )
  }
)
