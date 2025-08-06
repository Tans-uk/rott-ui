import {useContext, type FC} from 'react'

import {Platform} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useSafeArea} from '../../../hooks'
import {ThemeConfig} from '../../../models'
import {Content, type ContentProps} from '../../Content'
import {Image, type ImageProps} from '../../Image'
import {Item} from '../../Item'
import type {ButtonProps} from '../models'
import {Button} from './Button'

interface ButtonGroupProps<TTheme extends ThemeConfig> extends ContentProps<TTheme> {
  buttons: ButtonProps<TTheme> | Nullable<ButtonProps<TTheme>>[]
  hideButtons?: boolean
  sticky?: boolean
  image?: ImageProps<TTheme>
  children?: any
  isFastTransfer?: boolean
}

/**
 *
 * @param hideButtons - Butonları gizler, !!! TODO: Daha sonra daha iyi bir çözüm bulunabilir mi bakılmalı!
 * @returns
 */
export const ButtonGroup: FC<ButtonGroupProps<ThemeConfig>> = ({
  buttons,
  hideButtons,
  sticky,
  image,
  row,
  gap = 16,
  isFastTransfer,
  ...props
}) => {
  const {colors} = useContext(RottUiContext)
  /**
   * Ekranın altındaki NavBar ile çakışan Content'lerde (Örn:ButtonGroup) otomatik olarak 24 birim padding ekler.
   * IOS'te navbar transparan olduğu için eğer Navbar var ise 24 birim eklenmez. Çünkü kendisi boşluk gibi görünür.
   *
   * Etkilenen Ekranlar: LoginScreen, TransferToMobileScreen
   */
  const {bottom} = useSafeArea()
  let paddingBottom = bottom

  if (Platform.OS === 'android' || bottom === 0) paddingBottom += 24

  const hasMoreThanOneButton = Array.isArray(buttons)
  const stickyBottomProps = {
    shadowColor: colors['neutral-shadow-300'],
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 1,
    shadowRadius: 35,
    borderTopWidth: 1,
    borderTopColor: colors['neutral-grey-alpha-200'],
  }

  return (
    <Content
      flexShrink={1}
      paddingTop={24}
      paddingBottom={paddingBottom}
      useBottomInset
      {...props}
      {...(sticky ? stickyBottomProps : {})}>
      {!hideButtons && (
        <Item row={row} gap={gap}>
          {hasMoreThanOneButton &&
            buttons
              .filter((button) => button)
              .map((button, index) => (
                <Button key={button?.testID ?? `${button?.text}_${index}`} {...button} />
              ))}
          {!hasMoreThanOneButton && <Button {...buttons} />}
        </Item>
      )}

      {(!!image || isFastTransfer) && (
        <Item justifyContentCenter alignItemsCenter marginTop={16}>
          <Image
            testID='image-test-id'
            {...image}
            width={isFastTransfer ? 45 : image?.width}
            height={isFastTransfer ? 30 : image?.height}
            name={isFastTransfer ? 'FAST_LOGO' : image?.name}
          />
        </Item>
      )}
    </Content>
  )
}
