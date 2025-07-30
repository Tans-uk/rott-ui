import {isValidElement, type FC} from 'react'

import {themeConfig} from '../../../providers'
import {Content} from '../../Content'
import {Icon, type IconProps} from '../../Icon'
import {Image} from '../../Image'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'
import {useHeader} from '../hooks'
import type {HeaderProps} from '../models'

/**
 *
 * @param title - Eğer Icon yerine bir title gözükmesi isteniyorsa bu property kullanılabilir.
 * @param subTitle - Alt Baslik.
 * @param back - Bir önceki sayfaya dönülmek istendiğinde bu property'nin verilmesi yeterli olacaktır. Historyde kayıtlı geridönülebilir sayfa varsa otomatikman o sayfaya gidecektir.
 * @param logo - Verilen logo header'ın ortasında renderlanacaktır.
 * @param rightElement - Sağ tarafta render olacak elementi verebilirsiniz
 * @param rightIcon - Icon setlerinden herhangi birini verirseniz ekranda renderlanır
 * @param rightIconOnPress - Sağ tarafta renderlanan icon'a basıldığından gerçekleşmesi gereken bir işlem varsa bu prop kullanılabilir.
 * @param leftElement - Sol tarafta render olacak elementi verebilirsiniz
 * @param leftIcon - Icon setlerinden herhangi birini verirseniz ekranda renderlanır
 * @param leftIconOnPress - Sol tarafta renderlanan icon'a basıldığından gerçekleşmesi gereken bir işlem varsa bu prop kullanılabilir.
 * @param casal - Arka planın casal renkte olmasını istediğinizde kullanabilirsiniz.
 * @param paddingHorizontal - Yatayda kisisellestirilebilir bosluk
 * @param paddingVertical - Dikeyde kisisellestirilebilir bosluk
 *
 */
export const Header: FC<HeaderProps> = ({
  back,
  title,
  subTitle,
  logo,
  leftIcon,
  leftElement,
  rightIcon,
  rightElement,
  leftContainer,
  rightContainer,
  middleContainer,
  defaultBackgroundColor,
  backgroundColor,
  paddingHorizontal,
  paddingVertical,
  goBackFunction,
  preventGoBack,
  children,
  height = 56,
  ...props
}) => {
  const isLeftElement = isValidElement(leftElement)
  const isRightElement = isValidElement(rightElement)

  useHeader({
    preventGoBack,
    goBackFunction,
  })

  /**
   * @TODO: Header left ve right iconlarını hem tek hemde array olarak alabilmesi için bir yapı oluşturulacak.
   */
  return (
    <Content
      testID='header-test-id'
      minHeight={height}
      noPadding
      paddingHorizontal={paddingHorizontal ?? 24}
      paddingVertical={paddingVertical ?? 0}
      backgroundColor={defaultBackgroundColor ? themeConfig.colors['grey-800'] : backgroundColor}
      justifyContentCenter
      alignItemsCenter
      {...props}>
      <Item row height={height}>
        {/* Left Side */}
        <Item
          relative
          flexShrink={1}
          height={height}
          minWidth={height}
          justifyContentCenter
          {...leftContainer}>
          {!leftElement && !isLeftElement && (
            <Pressable
              {...(typeof leftIcon === 'object' ? {...leftIcon} : null)}
              testID='header-left-pressable-test-id'
              width={height}
              height={height}
              minWidth={height}
              alignItemsFlexStart={!leftIcon?.alignItemsCenter}
              alignItemsCenter={!!leftIcon?.alignItemsCenter}
              backgroundColor={leftIcon?.backgroundColor}
              borderRadius={leftIcon?.rounded ? height : leftIcon?.borderRadius}
              justifyContentCenter
              onPress={(event) => {
                !!leftIcon?.onPress && leftIcon?.onPress(event)
                !preventGoBack && back && themeConfig.goBack()
              }}>
              <Icon
                testID='header-left-icon-test-id'
                width={24}
                height={24}
                strokeWidth={back ? 2 : leftIcon?.strokeWidth}
                variant={(leftIcon as IconProps)?.variant}
                mode={(leftIcon as IconProps)?.mode ?? 'stroke'}
                noStroke={
                  (leftIcon as IconProps)?.noStroke ?? (leftIcon as IconProps)?.mode === 'fill'
                }
                {...(typeof leftIcon === 'object' ? (leftIcon as IconProps) : {})}
                name={back ? 'CHEVRON_LEFT' : ((leftIcon as IconProps)?.name ?? leftIcon)}
              />
            </Pressable>
          )}

          {leftElement && isLeftElement && leftElement}
        </Item>
        {/* Left Side */}

        {/* Middle */}
        <Item
          relative
          flex={1}
          height={height}
          minWidth={height}
          justifyContentCenter
          alignItemsCenter
          {...middleContainer}>
          {logo && <Image testID='header-logo-test-id' width={127} height={24} name={logo} />}

          {!logo && title && (
            <Label
              testID='header-title-test-id'
              textCenter
              fontSize='lg'
              fontFamily='Markpro-Bold'
              justifyContentCenter
              variant='white'
              numberOfLines={1}
              {...(typeof title === 'object' ? {...title} : null)}>
              {typeof title === 'string' ? title : title.text}
            </Label>
          )}
          {!logo && subTitle && (
            <Label
              testID='header-subtitle-test-id'
              textCenter
              fontSize='md'
              justifyContentCenter
              fontFamily='Markpro-Bold'
              variant='white'
              numberOfLines={1}
              {...(typeof subTitle === 'object' ? {...subTitle} : null)}>
              {typeof subTitle === 'string' ? subTitle : subTitle.text}
            </Label>
          )}
        </Item>
        {/* Middle */}

        {/* Right Side */}
        <Item
          relative
          flexShrink={1}
          height={height}
          minWidth={height}
          justifyContentCenter
          alignItemsFlexEnd
          {...rightContainer}>
          <Pressable
            {...(typeof rightIcon === 'object' ? {...rightIcon} : null)}
            testID='header-right-pressable-test-id'
            height={height}
            minWidth={height}
            alignItemsFlexStart={!rightIcon?.alignItemsCenter}
            alignItemsCenter={!!rightIcon?.alignItemsCenter}
            backgroundColor={rightIcon?.backgroundColor}
            borderRadius={rightIcon?.rounded ? height : rightIcon?.borderRadius}
            justifyContentCenter
            alignItemsFlexEnd
            onPress={(event) => !!rightIcon?.onPress && rightIcon?.onPress(event)}>
            {!rightElement && !isRightElement && (
              <Icon
                testID='header-right-icon-test-id'
                width={24}
                height={24}
                strokeWidth={back ? 2 : rightIcon?.strokeWidth}
                variant={(rightIcon as IconProps)?.variant}
                mode={(rightIcon as IconProps)?.mode ?? 'stroke'}
                noStroke={
                  (rightIcon as IconProps)?.noStroke ?? (rightIcon as IconProps)?.mode === 'fill'
                }
                {...(typeof rightIcon === 'object' ? (rightIcon as IconProps) : {})}
                name={(rightIcon as IconProps)?.name ?? rightIcon}
              />
            )}
          </Pressable>

          {rightElement && isRightElement && rightElement}
        </Item>
        {/* Right Side */}
      </Item>

      {children}
    </Content>
  )
}
