/**
 * Action Menu Data Tipi
 *
 * @property {string} title - Başlık
 * @property {string} name - actionName - Testler için gerekli. *Örnek Kullanım:* ```action-name```
 * @property {void} action - onPress olduğunda çalışması istenen fonksiyon
 *
 * Örnek:
 *```
 * const actionMenuData: ActionModel[] = [
 *   {
 *     name: 'para-gonder',
 *     title: 'Para Gonder',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Para Gonder');
 *     },
 *   },
 *   {
 *     name: 'hesap-hareketleri-incele',
 *     title: 'Hesap Hareketleri Incele',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Hesap Hareketleri Incele');
 *     },
 *   },
 * ];
 * ```
 */
export interface ActionModel {
  title: string
  name: string
  action: () => void
}
