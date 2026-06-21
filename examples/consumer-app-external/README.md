# External Consumer App Example

This is a **fully external** example app that consumes `@tansuk/rott-ui` from npm, just like a real consumer project would.

## Key Differences from `consumer-app`

- **NOT** part of the yarn workspace
- Uses `@tansuk/rott-ui` from **npm** (not `workspace:*`)
- No internal path mappings or resolvers
- Metro config only uses the public `@tansuk/rott-ui/metro` export

## Setup

```bash
cd examples/consumer-app-external
npm install
# or
yarn install
```

## Running

```bash
# Start Metro
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Asset Auto-Discovery

This example uses the `withRottAssets()` metro wrapper to automatically discover and register assets from `src/assets/`:

```javascript
// metro.config.js
const { withRottAssets } = require('@tansuk/rott-ui/metro')

module.exports = withRottAssets(mergeConfig(defaultConfig, config))
```

Simply add image/icon files to:
- `src/assets/images/` - for images
- `src/assets/icons/svg/` - for SVG icons

Then restart Metro and use them by filename:

```tsx
<Image name="my-image" />
<Icon name="my-icon" />
```

### TypeScript Autocomplete

The wrapper automatically generates TypeScript definitions in `.rott/consumer-assets.d.ts`. To enable autocomplete:

1. Add `.rott/**/*.d.ts` to your `tsconfig.json` include:
   ```json
   {
     "include": ["**/*.ts", "**/*.tsx", ".rott/**/*.d.ts"]
   }
   ```

2. Restart your TypeScript server (in VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server")

3. You'll now get autocomplete for your custom assets!

## Testing Library Updates

To test changes to `@tansuk/rott-ui`:

1. Build and publish the library (or use `npm link` / `yarn link`)
2. Update the version in this project's `package.json`
3. Run `npm install` or `yarn install`
4. Restart Metro

This workflow simulates how real consumers will use the library.
