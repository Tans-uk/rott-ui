import type {ReactNode} from 'react'

import type {ModalProps} from '../../../features/Modal/models'
import type {Size, ThemeConfig} from '../../../models'
import type {ResultActionModel} from './resultActionModel'

/**
 * Result Data Tipi
 *
 * @property {string} title - Başlık
 * @property {string} name - actionName - Testler için gerekli. *Örnek Kullanım:* ```action-name```
 * @property {void} action - onPress olduğunda çalışması istenen fonksiyon
 *
 * Örnek:
 *```
 * const resultData: ResultDataProps[] = [
 *   {
 *     name: 'dekont-gonder',
 *     title: 'Dekont Gonder',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Dekont Gonder');
 *     },
 *   },
 *   {
 *     name: 'yeni-islem',
 *     title: 'Yeni Islem',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Yeni Islem');
 *     },
 *   },
 * ];
 * ```
 */
export interface ResultProps<TTheme extends ThemeConfig>
  extends Omit<ModalProps<TTheme>, 'fullScreen'> {
  title?: string | ReactNode
  description?: string | ReactNode

  /*
   * ResultVariant, işlemin sonucunu temsil eden bir türdür.
   * Bu tür, aşağıdaki değerleri alabilir:
   * - 'success': İşlem başarıyla tamamlandı.
   * - 'warning': İşlem sırasında uyarılar meydana geldi.
   * - 'error': İşlem başarısız oldu.
   * - 'info': İşlem hakkında bilgilendirici bilgiler sağlandı.
   */
  variant: keyof TTheme['colors']
  iconName: keyof TTheme['icons']

  actions?: ResultActionModel<TTheme>[]
  fontSize?: Size

  isShow?: boolean
}

export interface ResultScreenParamModel<TTheme extends ThemeConfig> {
  header?: string
  state: keyof TTheme['images']
  title?: string
  description?: string
  actions?: ResultActionModel<TTheme>[]
  fontSize?: Size
  isFastTransfer?: boolean
}
