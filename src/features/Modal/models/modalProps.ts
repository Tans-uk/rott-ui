import type {PropsWithChildren, ReactNode} from 'react'

import type {ModalProps as RNModalProps} from 'react-native'

import type {ThemeConfig} from '../../../models'
import type {HeaderProps} from '../../Header'

export interface ModalProps<TTheme extends ThemeConfig>
  extends PropsWithChildren,
    Omit<RNModalProps, 'transparent' | 'animated' | 'id'> {
  id?: number
  fullScreen?: boolean

  header?: ReactNode | HeaderProps<TTheme>
  closeButton?: boolean
  onClose?: () => void
  disableOutsideClick?: boolean

  /**
   * Değer 0 ila 100 arasında olmalıdır.
   */
  height?: number
  backgroundColor?: string
  panResponderBackgroundColor?: keyof TTheme['colors']
  headerBackgroundColor?: keyof TTheme['colors']
  slideToClose?: boolean

  alignItemsCenter?: boolean
  justifyContentCenter?: boolean

  /**
   * transparent özelliği aktif edildiğinde item istendiği gibi sağa sola kaydırılabilir hale gelmektedir.
   *
   * InformationModal bu senaryoya ihtiyaç duymuş ve onun için geliştirilmiştir.
   * Bu özellik aktif edilmezse backgroundColor='transparent' verilse dahi arka plana tıklandığında modal kapanmamaktadır.
   * */
  transparent?: boolean
  modals?: ModalProps<TTheme>[]

  modalContainerMarginBottom?: number
  children?: any

  /** Modal açıkken soft klavye aktive edildiğinde modalın klavyeye yapışık halde sürüklenmesini sağlar.
   * Eğer modal belli bir uzunluktan yüksek ise bu prop dikkate alınmaz.
   */
  sticksToKeyboard?: boolean
}
