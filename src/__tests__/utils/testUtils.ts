import {RottProvider} from '../../providers'

import {renderAsync, type RenderOptions} from '@testing-library/react-native'

/**
 * Async render (React 19 + RNTL): sync `render` leaves React `act()` thenables floating.
 *
 * @param ui
 * @param options.reducers: Reducers nesnesi verildiği taktirde uygulama içinde ki verilen storeları gider değiştirir.
 * @returns
 */
export async function render(ui: any, options?: RenderOptions) {
  return renderAsync(ui, {wrapper: RottProvider, ...options})
}

export {
  act,
  cleanup,
  cleanupAsync,
  configure,
  fireEvent,
  fireEventAsync,
  renderAsync,
  screen,
  userEvent,
  waitFor,
  within,
} from '@testing-library/react-native'
