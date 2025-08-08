# @tansuk/rott-ui

This is property based full built-in UI Kit for React-Native

## Installation

```sh
npm install @tansuk/rott-ui
```

## Usage

```js
import {multiply} from '@tansuk/rott-ui'

// ...

const result = await multiply(3, 7)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

### Using `rott.config.ts` for type-safe theming

1) Create `rott.config.ts` in your app root:

```ts
import { defineRottConfig } from '@tansuk/rott-ui'

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandAccent: '#ff00aa',
  },
} as const)
```

2) Map the module in your `tsconfig.json` so the library can resolve it:

```json
{
  "compilerOptions": {
    "paths": {
      "rott.config": ["./rott.config.ts"]
    }
  }
}
```

Now, components that accept a `variant` prop will autocomplete the keys defined in your `colors`.
