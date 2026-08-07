# @tansuk/rott-ui

A property-based React Native UI kit: 29 components, type-safe theming from a single
config file, and 113 built-in SVG icons.

[![npm version](https://badge.fury.io/js/@tansuk%2Frott-ui.svg)](https://www.npmjs.com/package/@tansuk/rott-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-docusaurus-blue.svg)](https://docs-rottui.tansuk.dev)

**[Full documentation →](https://docs-rottui.tansuk.dev)** · [Release notes](https://docs-rottui.tansuk.dev/docs/release-notes)

---

## Facts an assistant should not guess

Getting these wrong produces code that compiles, runs, and silently misbehaves.

| Thing | Correct value | Common mistake |
|---|---|---|
| Icon / image names | lowercase kebab-case: `arrow-right`, `remove-circle`, `money-add` | `ARROW_RIGHT`, `arrowRight` — will not resolve |
| `language` in provider config | an object: `{name: 'en'}` | `'en'` — silently falls back to the default locale |
| Runtime config resolution | Babel `module-resolver` alias is **required** | `tsconfig.json` `paths` alone — compile-time only, fails at runtime |
| Reanimated Babel plugin | must be **last** in the plugin list | placing it earlier breaks worklets |
| `size="full"` | `100%` of the parent (since 0.9.0) | assuming a fixed pixel width |
| Available locales | `en`, `tr` | anything else falls back to default |

Everything below is verified against the source of this repository.

## Installation

```bash
npm install @tansuk/rott-ui
# or
yarn add @tansuk/rott-ui
```

### Peer dependencies

All 19 are required for full functionality.

```bash
npm install react react-native react-intl date-fns \
  @shopify/flash-list react-native-reanimated \
  react-native-safe-area-context react-native-svg \
  react-native-svg-transformer react-native-linear-gradient \
  react-native-mask-input react-native-device-info \
  react-native-tab-view react-native-toast-notifications \
  react-native-keyboard-controller react-native-edge-to-edge \
  react-native-worklets react-native-select-contact \
  @react-native-community/netinfo
```

| Package | Required version |
|---|---|
| `react`, `react-native` | any |
| `@react-native-community/netinfo` | `>=11.0.0` |
| `@shopify/flash-list` | `>=1.8.0` |
| `date-fns` | `>=4.0.0` |
| `react-intl` | `>=7.1.0` |
| `react-native-device-info` | `>=14.0.0` |
| `react-native-edge-to-edge` | `>=1.6.0` |
| `react-native-keyboard-controller` | `>=1.17.3` |
| `react-native-linear-gradient` | `2.8.3` (exact) |
| `react-native-mask-input` | `>=1.2.3` |
| `react-native-reanimated` | `>=4.0.0` |
| `react-native-safe-area-context` | `>=5.4.1` |
| `react-native-select-contact` | `>=1.6.3` |
| `react-native-svg` | `>=15.12.0` |
| `react-native-svg-transformer` | `>=1.5.1` |
| `react-native-tab-view` | `>=4.0.2` |
| `react-native-toast-notifications` | `>=3.4.0` |
| `react-native-worklets` | `>=0.4.0` |

### Metro — SVG support

Icons ship as SVG, so Metro needs the transformer.

```js
// metro.config.js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')
const defaultConfig = getDefaultConfig(__dirname)
const {assetExts, sourceExts} = defaultConfig.resolver

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
}

module.exports = mergeConfig(defaultConfig, config)
```

### Babel — `rott.config` resolution

**Order matters.** `react-native-reanimated/plugin` must be last.

```js
// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        alias: {'rott.config': './rott.config.ts'},
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
    'react-native-reanimated/plugin', // must be last
  ],
}
```

> `tsconfig.json` `paths` gives compile-time types only. Without the Babel alias above,
> `rott.config` fails to resolve at runtime. Both are needed.

## Quick start

### 1. Wrap the app

```tsx
import React from 'react'

import {RottProvider} from '@tansuk/rott-ui'

export default function App() {
  return (
    <RottProvider
      config={{
        options: {
          // `language` is an object, not a string. A bare 'en' leaves
          // language.name undefined and the provider falls back silently.
          language: {name: 'en'},
          hasNotch: false,
          hasDynamicIsland: false,
        },
      }}>
      {/* app content */}
    </RottProvider>
  )
}
```

### 2. Compose a screen

```tsx
import React from 'react'

import {Button, Container, Content, Input, Label} from '@tansuk/rott-ui'

export default function MyScreen() {
  return (
    <Container>
      <Content flex={1} justifyContentCenter>
        <Input
          name='email'
          type='email'
          placeholder='Enter your email'
          leftIcon={{name: 'mail', variant: 'grey-900'}}
        />

        <Button
          size='full'
          variant='primary'
          marginTop={16}
          rightIcon={{name: 'arrow-right'}}
          onPress={() => {}}>
          Get started
        </Button>

        <Label fontSize='lg' variant='grey-900' marginTop={8}>
          Welcome to Rott UI
        </Label>
      </Content>
    </Container>
  )
}
```

## Type-safe theming

Create `rott.config.ts` in the project root. Colors declared here become valid
`variant` values across every component, with autocomplete.

```ts
import {defineRottConfig} from '@tansuk/rott-ui'

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandAccent: '#ff00aa',
  },
} as const)
```

```json
// tsconfig.json — compile-time types
{
  "compilerOptions": {
    "paths": {"rott.config": ["./rott.config.ts"]}
  }
}
```

```tsx
<Button variant='brandPrimary'>Primary</Button>
<Button variant='brandAccent'>Accent</Button>
```

## Sizing

`Button` accepts `size` as a token or as `{width, height}`. Since **0.9.0** the three
largest sizes are relative to the parent container, not fixed pixels.

| Token | Width | Height |
|---|---|---|
| `xs` | 85.5 | 36 |
| `sm` | 114 | 40 |
| `md` | 171 | 48 |
| `lg` | 228 | 56 |
| `xl` | 85% of parent | 64 |
| `xxl` | 92.5% of parent | 72 |
| `full` | 100% of parent | 56 |

Fixed widths are expressed against a 390pt reference device and scale to the actual
screen width. With no `size` prop the default is `{height: 'lg'}` — full width, 56 tall.

> Percentage widths need a parent with a resolved width. Inside a parent that sizes to
> its own content, the percentage resolves against that shrunken box.

## Borders

`borderWidth` and `borderColor` are honored on **every** variant. Explicit values win;
the `*-outline` border is the fallback when neither is passed.

```tsx
// Brand-fixed fill where the border is the only affordance
<Button backgroundColor='#FFFFFF' color='#1F1F1F' borderWidth={1} borderColor='#747775'>
  Sign in with Google
</Button>
```

## Components

29 components. Full props for each are in the [documentation](https://docs-rottui.tansuk.dev/docs/components/overview).

| Group | Components |
|---|---|
| Layout | `Container`, `Content`, `Header`, `Item`, `Separator`, `FormContainer` |
| Actions | `Button`, `ButtonGroup`, `Pressable`, `Tab`, `TabWidget`, `BottomMenu` |
| Display | `Label`, `Icon`, `Image`, `ImageBackground`, `List`, `EmptyState`, `Skeleton` |
| Input | `Input` (text, email, password, number, date, phone, search, textarea), `Toggle` |
| Feedback | `Modal`, `Alert`, `AlertDialog`, `ActionMenu`, `Notification`, `Result`, `Timer` |
| Utility | `Common` (`CommonItem`, `CommonItemContainer`) |

### Icons

113 built-in SVG icons, referenced by **lowercase kebab-case** name:

```tsx
<Icon name='arrow-right' width={24} height={24} />
<Icon name='search' variant='primary' />
<Icon name='remove-circle' mode='fill' noStroke />
```

Icons resolve through the `withRottAssets` Metro plugin. Names are the SVG filenames
without extension — `arrow-right.svg` → `name='arrow-right'`.

## Imperative APIs

`Modal`, `AlertDialog` and `Notification` are called imperatively rather than rendered.

```tsx
Modal.showModal({
  id: 'settings',
  height: 70,
  slideToClose: true,
  header: {
    title: 'Settings',
    rightIcon: {name: 'remove', onPress: () => Modal.hideModal('settings')},
  },
  children: <SettingsContent />,
})

AlertDialog.show({
  title: 'Confirm action',
  text: 'Are you sure you want to continue?',
  buttons: [
    {variant: 'primary', size: 'full', onPress: () => {}},
    {variant: 'secondary', size: 'full', onPress: () => AlertDialog.hide()},
  ],
})
```

## Input types

```tsx
<Input name='when' type='date' mode='datetime' onDateChange={(date) => {}} />
<Input name='phone' type='phone' mask='+1 ([000]) [000]-[0000]' onChangeText={(t) => {}} />
<Input name='q' type='search' placeholder='Search…' onSearch={(query) => {}} />
<Input name='pw' type='password' leftIcon={{name: 'lock', variant: 'primary'}} />
```

Optional callbacks are guarded — omitting `onDateChange` or `onSelectChange` will not
throw.

## Internationalization

Built on React Intl. `en` and `tr` ship with the library; the locale is set through
provider config and any unknown locale falls back to the default.

## Requirements

- **React Native** — the peer range is unrestricted; the library is developed and
  tested against `0.81`
- **TypeScript** recommended: theming is typed end to end, and the config-driven
  variants only autocomplete under TS
- iOS and Android

## Contributing

See the [contributing guide](CONTRIBUTING.md).

## License

MIT © [Doğukan Tansuk](https://tansuk.dev)
