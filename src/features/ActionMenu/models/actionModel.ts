/**
 * Action Menu Data Tipi
 *
 * @property {string} title - Heading text
 * @property {string} name - actionName, required by tests. *Example:* ```action-name```
 * @property {void} action - Called when the action is pressed
 *
 * Example:
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
