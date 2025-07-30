import {RottProvider} from '../../providers'

import {render} from '@testing-library/react-native'

/**
 *
 * @param ui
 * @param options.reducers: Reducers nesnesi verildiği taktirde uygulama içinde ki verilen storeları gider değiştirir.
 * @returns
 */
const customRender = (ui: any, options?: any) => render(ui, {wrapper: RottProvider, ...options})

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}
