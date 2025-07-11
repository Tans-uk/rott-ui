# Rott UI Deployment & Example Guide

## Fixed Issues

### 1. Yarn Example Command

**Problem**: `yarn example` was failing with "Not enough positional arguments"
**Solution**: Updated script in root `package.json` from:

```json
"example": "yarn workspace @tansuk/rott-ui-example"
```

to:

```json
"example": "yarn workspace @tansuk/rott-ui-example start"
```

### 2. Testing Library in Production Bundle

**Problem**: `@testing-library/react-native` was being included in production bundle
**Solution**:

- Removed `testUtils.ts` and `commonUiTestExtension.ts` from main exports
- Added metro config exclusions for test files
- Updated TypeScript build config to exclude test files

### 3. Missing Peer Dependencies

**Problem**: Library dependencies were missing in example app
**Solution**: Added essential peer dependencies to example/package.json:

- `react-native-safe-area-context`
- `react-native-device-info`
- `react-intl`
- `@shopify/flash-list`
- And other required dependencies

### 4. Version Compatibility

**Problem**: Expo and React Native version mismatches
**Solution**: Updated to compatible versions:

- `expo`: `~53.0.19`
- `react-native`: `0.79.5`

## Available Commands

From root directory:

```bash
# Start example app
yarn example

# Platform specific
yarn example:android
yarn example:ios
yarn example:web
```

From example directory:

```bash
cd example
yarn start
yarn android
yarn ios
yarn web
```

## Dependencies Installation Strategy

### Essential Dependencies (Already Added)

Core dependencies needed for basic UI components:

- `react-native-safe-area-context`
- `react-native-device-info`
- `react-intl`
- `@shopify/flash-list`
- `react-native-reanimated`
- `react-native-svg`

### Component-Specific Dependencies

Install as needed when showcasing specific components:

- `react-native-mask-input` - for Input components (IBAN, Phone, etc.)
- `react-native-date-picker` - for DateInput
- `react-native-linear-gradient` - for gradient styling
- `react-native-toast-notifications` - for Notification component
- etc.

## Build Process

1. Clean previous builds: `yarn clean`
2. Rebuild library: `yarn prepare`
3. Test example: `yarn example`

## Metro Configuration

The example project is configured to exclude test files from bundling:

- `**/__tests__/**/*`
- `**/*.test.*`
- `**/*.spec.*`
- Test utility files
- `@testing-library/*` packages

This prevents testing utilities from being included in the production bundle.
