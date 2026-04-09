import {
  defaultThemeConfig,
  defineRottConfig,
} from '../../src/rott-config-entry';

export const config = defineRottConfig({
  ...defaultThemeConfig,
} as const);
