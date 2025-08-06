/* eslint-disable react-native/no-inline-styles */
import {isValidElement, memo, useContext, type FC} from 'react'

import {RottUiContext} from '../../../contexts'
import {useColorFromVariant} from '../../../hooks'
import {ThemeConfig} from '../../../models'
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
export const CommonItem: FC<CommonItemProps<ThemeConfig>> = memo(
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
    const colorFromVariant = useColorFromVariant()
    const {colors} = useContext(RottUiContext)

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
                  borderColor={selected ? colors.primary : colors['grey-200']}
                  justifyContentCenter
                  alignItemsCenter>
                  {(selected || selectionDisabled) && (
                    <Item
                      width={selected ? 16 : 24}
                      height={selected ? 16 : 24}
                      borderRadius={13}
                      backgroundColor={selected ? colors.primary : colors['grey-200']}
                      style={{
                        shadowColor: selected ? colors['neutral-blue-soft'] : colors['grey-200'],
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: selected ? 1 : 0,
                        shadowRadius: 1,
                        borderWidth: 2,
                        borderColor: selected ? colors['neutral-blue-soft'] : colors['grey-200'],
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
                  !!(leftIcon as IconProps<ThemeConfig>)?.onPress &&
                    (leftIcon as IconProps<ThemeConfig>)?.onPress?.(event)

                  !!onPress && !(leftIcon as IconProps<ThemeConfig>)?.onPress && onPress()
                }}
                {...(typeof leftIcon === 'object' ? {...leftIcon} : null)}
                key={undefined}>
                {isValidElement(leftIcon) && <>{leftIcon}</>}
                {!isValidElement(leftIcon) && (
                  <Item width={24} height={24}>
                    <Icon
                      width={24}
                      height={24}
                      variant={(leftIcon as IconProps<ThemeConfig>)?.variant ?? 'grey-900'}
                      mode={(leftIcon as IconProps<ThemeConfig>)?.mode}
                      noStroke={(leftIcon as IconProps<ThemeConfig>)?.noStroke}
                      {...(typeof leftIcon === 'object'
                        ? (leftIcon as IconProps<ThemeConfig>)
                        : {})}
                      name={(leftIcon as IconProps<ThemeConfig>)?.name ?? leftIcon}
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
                  {(((title as LabelProps<ThemeConfig>)?.text &&
                    (title as LabelProps<ThemeConfig>)?.text !== '') ||
                    (typeof title === 'string' && title !== '')) && (
                    <Label
                      testID='title-test-id'
                      variant={(title as LabelProps<ThemeConfig>)?.variant ?? 'grey-900'}
                      fontSize={(title as LabelProps<ThemeConfig>)?.fontSize ?? 'lg'}
                      fontFamily={(title as LabelProps<ThemeConfig>)?.fontFamily}
                      fontWeight={(title as LabelProps<ThemeConfig>)?.fontWeight ?? '600'}
                      size={(title as LabelProps<ThemeConfig>)?.size ?? 'full'}
                      {...(typeof title === 'object' ? {...title} : null)}>
                      {typeof title === 'string' ? title : (title as LabelProps<ThemeConfig>)?.text}
                    </Label>
                  )}

                  {(!(title as LabelProps<ThemeConfig>)?.text || title === '') && (
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
                      {(((subTitle as LabelProps<ThemeConfig>)?.text &&
                        (subTitle as LabelProps<ThemeConfig>)?.text !== '') ||
                        (typeof subTitle === 'string' && subTitle !== '')) && (
                        <Label
                          testID='subtitle-test-id'
                          variant={(subTitle as LabelProps<ThemeConfig>)?.variant ?? 'grey-900'}
                          fontSize={(subTitle as LabelProps<ThemeConfig>)?.fontSize ?? 'md'}
                          fontFamily={
                            (subTitle as LabelProps<ThemeConfig>)?.fontFamily ?? 'Markpro-Medium'
                          }
                          fontWeight={(subTitle as LabelProps<ThemeConfig>)?.fontWeight ?? '600'}
                          marginTop={(subTitle as LabelProps<ThemeConfig>)?.marginTop ?? 8}
                          {...(typeof subTitle === 'object' ? {...subTitle} : null)}>
                          {typeof subTitle === 'string'
                            ? subTitle
                            : (subTitle as LabelProps<ThemeConfig>)?.text}
                        </Label>
                      )}

                      {(!(subTitle as LabelProps<ThemeConfig>)?.text || subTitle === '') && (
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
                      variant={(description as LabelProps<ThemeConfig>)?.variant ?? 'grey-900'}
                      fontSize={(description as LabelProps<ThemeConfig>)?.fontSize ?? 'md'}
                      fontFamily={
                        (description as LabelProps<ThemeConfig>)?.fontFamily ?? 'Markpro-Medium'
                      }
                      fontWeight={(description as LabelProps<ThemeConfig>)?.fontWeight ?? '600'}
                      marginTop={(description as LabelProps<ThemeConfig>)?.marginTop ?? 8}
                      {...(typeof description === 'object' ? {...description} : null)}>
                      {typeof description === 'string'
                        ? description
                        : (description as LabelProps<ThemeConfig>)?.text}
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
                marginLeft={(rightIcon as IconProps<ThemeConfig>)?.marginLeft ?? 16}
                {...(typeof rightIcon === 'object' ? {...rightIcon} : null)}
                key={undefined}
                disabled={selectionDisabled}
                onPress={(event) => {
                  !!(rightIcon as IconProps<ThemeConfig>)?.onPress &&
                    (rightIcon as IconProps<ThemeConfig>)?.onPress?.(event)

                  !!onPress && !(rightIcon as IconProps<ThemeConfig>)?.onPress && onPress()
                }}>
                {!showSelected && isValidElement(rightIcon) && <>{rightIcon}</>}
                {!showSelected && !isValidElement(rightIcon) && (
                  <Item width={24} height={24}>
                    <Icon
                      width={24}
                      height={24}
                      variant={(rightIcon as IconProps<ThemeConfig>).variant ?? 'grey-900'}
                      mode={(rightIcon as IconProps<ThemeConfig>).mode}
                      noStroke={(rightIcon as IconProps<ThemeConfig>).noStroke}
                      {...(typeof rightIcon === 'object'
                        ? (rightIcon as IconProps<ThemeConfig>)
                        : {})}
                      name={(rightIcon as IconProps<ThemeConfig>).name ?? rightIcon}
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
                  borderColor={selected ? colors.primary : colors['grey-200']}
                  justifyContentCenter
                  alignItemsCenter>
                  {(selected || selectionDisabled) && (
                    <Item
                      width={selected ? 16 : 24}
                      height={selected ? 16 : 24}
                      borderRadius={13}
                      backgroundColor={selected ? colors.primary : colors['grey-200']}
                      style={{
                        shadowColor: selected ? colors['neutral-blue-soft'] : colors['grey-200'],
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: selected ? 1 : 0,
                        shadowRadius: 1,
                        borderWidth: 2,
                        borderColor: selected ? colors['neutral-blue-soft'] : colors['grey-200'],
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
