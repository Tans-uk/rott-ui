# PasswordInput & Label P1 Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix two P1 consumer-facing bugs — `PasswordInput` stripping text passwords and `Label` ignoring its `text` prop — and ship as 0.6.0.

**Architecture:** Two independent component fixes in a React Native UI library. `PasswordInput` gains a `numericOnly` opt-in (text becomes the default) and an optional leading `icon`; `Label` renders `{children ?? text}`. Both follow conventions already in `Button.tsx`. Targeted Jest + React Testing Library tests guard each fix.

**Tech Stack:** TypeScript, React Native 0.81, Jest, @testing-library/react-native, react-native-builder-bob.

## Global Constraints

- Target version: **0.6.0** (minor — PasswordInput changes default behavior).
- Commit messages in **English**, Conventional Commits / commitlint compliant (repo enforces via lefthook commit-msg hook; `.cursor/rules` requires English).
- Test util import: `import {fireEvent, render, waitFor} from '<relative>/__tests__/utils/testUtils'`.
- Single-test run command: `yarn jest <path>` ; snapshot update: `yarn jest -u <path>`.
- `Icon` and `Item` are already imported in `PasswordInput.tsx` — do not re-add.
- Do NOT change Android/iOS paste-prevention (`contextMenuHidden`, `onSelectionChange`).
- `Label`'s `text?: string` already exists in `labelProps.ts` — do not re-add the type.

---

### Task 1: Label renders its `text` prop

**Files:**
- Modify: `src/features/Label/components/Label.tsx`
- Create: `src/features/Label/__tests__/Label.test.tsx`

**Interfaces:**
- Consumes: `Label` from `src/features/Label` (named export, barrel `src/features/Label/index.ts`).
- Produces: no API change — `LabelProps.text?: string` already declared; this task makes it render via `{children ?? text}`.

- [ ] **Step 1: Write the failing test**

Create `src/features/Label/__tests__/Label.test.tsx`:

```tsx
import React from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import {Label} from '../components'

describe('Label -> text prop', () => {
  it('renders the text prop when no children are passed', async () => {
    const {getByText} = await render(<Label text='Görünür' />)

    expect(getByText('Görünür')).toBeTruthy()
  })

  it('renders children when both text and children are passed', async () => {
    const {getByText, queryByText} = await render(<Label text='FromText'>FromChildren</Label>)

    expect(getByText('FromChildren')).toBeTruthy()
    expect(queryByText('FromText')).toBeNull()
  })

  it('renders children when no text prop is passed', async () => {
    const {getByText} = await render(<Label>OnlyChildren</Label>)

    expect(getByText('OnlyChildren')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn jest src/features/Label/__tests__/Label.test.tsx`
Expected: FAIL — the first test (`renders the text prop when no children`) fails because `Label` renders only `children` today, so `getByText('Görünür')` throws "Unable to find an element with text: Görünür".

- [ ] **Step 3: Write minimal implementation**

In `src/features/Label/components/Label.tsx`, add `text` to the destructured props (between `variant` and `textCenter`) and change the rendered child from `{children}` to `{children ?? text}`:

```tsx
export const Label: FC<LabelProps> = forwardRef<Text, LabelProps>(
  (
    {
      fontSize = 'md',
      variant = 'black',
      text,
      textCenter,
      fontWeight,
      fontFamily,
      letterSpacing = undefined,
      color,
      style,
      children,
      flex,
      ...props
    },
    ref
  ) => {
    return (
      <Text
        ref={ref}
        style={StyleSheet.flatten([
          LabelStyles({
            textCenter,
            flex: flex ?? 1,
            fontSize,
            variant,
            fontWeight,
            fontFamily,
            letterSpacing,
            color,
            includeLatterSpacing: true,
            ...props,
          }).defaultLabelStyle,
          style,
        ])}
        {...props}>
        {children ?? text}
      </Text>
    )
  }
)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn jest src/features/Label/__tests__/Label.test.tsx`
Expected: PASS — all three tests green.

- [ ] **Step 5: Commit**

```bash
git add src/features/Label/components/Label.tsx src/features/Label/__tests__/Label.test.tsx
git commit -m "fix(label): render the documented text prop

Label declared text?: string but rendered only children, so
<Label text=\"x\" /> showed nothing. Render {children ?? text} so the
prop honours its type; children keep precedence for backward compat."
```

---

### Task 2: PasswordInput model — add `numericOnly` and `icon`

**Files:**
- Modify: `src/features/Input/models/passwordInputProps.interface.ts`

**Interfaces:**
- Consumes: `BaseInputProps` from `./baseInputProps.interface`; `IconProps` from `../../Icon`.
- Produces: `PasswordInputProps` with two new optional fields used by Task 3:
  - `numericOnly?: boolean` (default behavior in component: `false`)
  - `icon?: IconProps`

- [ ] **Step 1: Update the interface**

Replace the full contents of `src/features/Input/models/passwordInputProps.interface.ts` with:

```ts
import type {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PasswordInputProps extends BaseInputProps {
  type?: 'password'
  /** When true, restrict input to digits and use a numeric keyboard (PIN-style). Default: false. */
  numericOnly?: boolean
  /** Optional leading icon rendered inside the field. */
  icon?: IconProps
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `yarn typecheck`
Expected: PASS — no type errors. (`IconProps` is exported from `src/features/Icon`; the import resolves.)

- [ ] **Step 3: Commit**

```bash
git add src/features/Input/models/passwordInputProps.interface.ts
git commit -m "feat(input): add numericOnly and icon props to PasswordInputProps"
```

---

### Task 3: PasswordInput — text default, `numericOnly` gating, leading icon

**Files:**
- Modify: `src/features/Input/components/PasswordInput.tsx`
- Modify: `src/features/Input/styles/PasswordInput.style.ts`
- Modify: `src/features/Input/__tests__/PasswordInput.test.tsx` (rewrite — existing tests assert the old buggy behavior)
- Delete + regenerate: `src/features/Input/__tests__/__snapshots__/PasswordInput.test.tsx.snap`

**Interfaces:**
- Consumes: `PasswordInputProps` from Task 2 (`numericOnly?: boolean`, `icon?: IconProps`); `Icon`, `Item`, `Pressable` (already imported); `PasswordInputStyles` (extended in this task).
- Produces: corrected `PasswordInput` behavior. New testIDs: existing `show-password-icon-test-id` (unchanged) and new `password-leading-icon-test-id`.

- [ ] **Step 1: Rewrite the test file to assert corrected behavior**

Replace the full contents of `src/features/Input/__tests__/PasswordInput.test.tsx` with:

```tsx
import React from 'react'

import {fireEvent, render, waitFor} from '../../../__tests__/utils/testUtils'
import {PasswordInput} from '../components'

describe('Password Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const showPasswordIconTestId = 'show-password-icon-test-id'
  const leadingIconTestId = 'password-leading-icon-test-id'

  it('password input ilk render anında snapshot ile eşleşmeli', async () => {
    const renderedInput = await render(<PasswordInput name='test' testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('varsayılan olarak metin girişini olduğu gibi kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PasswordInput name='test' testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('aaA*a123')
  })

  it('numericOnly verildiğinde yalnızca rakamları kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = await render(
      <PasswordInput name='test' numericOnly testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('varsayılan klavye default olmalı', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'default')
  })

  it('numericOnly verildiğinde klavye number-pad olmalı', async () => {
    const {getByTestId} = await render(
      <PasswordInput name='test' numericOnly testID={inputTestId} />
    )
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })

  it('icon verildiğinde leading icon render edilmeli', async () => {
    const {getByTestId} = await render(
      <PasswordInput name='test' testID={inputTestId} icon={{name: 'lock'}} />
    )

    expect(getByTestId(leadingIconTestId)).toBeTruthy()
  })

  it('input ilk renderlandiginda text gorunur olmamali', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)
  })

  it('input ilk renderlandiginda sifre goster iconu gorunmeli', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)

    expect(getByTestId(showPasswordIconTestId)).toBeTruthy()
  })

  it('sifre goster iconuna tiklandiginda sifre gorunur olmali', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)

    fireEvent.press(getByTestId(showPasswordIconTestId))

    expect(inputElement).toHaveProp('secureTextEntry', false)
  })

  it('IOS icin yapıştırma özelliği kapatılmalı', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('contextMenuHidden', true)
  })

  it('Android icin yapıştırma özelliği kapatılmalı', async () => {
    const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('onSelectionChange')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn jest src/features/Input/__tests__/PasswordInput.test.tsx`
Expected: FAIL — `varsayılan olarak metin girişini olduğu gibi kabul etmeli` fails (current code strips to `'123'`, not `'aaA*a123'`); `varsayılan klavye default olmalı` fails (current is `number-pad`); `icon ... leading icon render edilmeli` fails (no icon rendered yet); snapshot mismatch.

- [ ] **Step 3: Add the leading-icon style**

Replace the full contents of `src/features/Input/styles/PasswordInput.style.ts` with:

```ts
import {StyleSheet} from 'react-native'

export const PasswordInputStyles = () =>
  StyleSheet.create({
    showPasswordIcon: {
      position: 'absolute',
      top: 0,
      right: 10,
      bottom: 0,
    },
    leadingIcon: {
      position: 'absolute',
      top: 0,
      left: 10,
      bottom: 0,
      justifyContent: 'center',
    },
  })
```

- [ ] **Step 4: Update the component**

Replace the full contents of `src/features/Input/components/PasswordInput.tsx` with:

```tsx
import {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import type {PasswordInputProps} from '../models'
import {InputStyles, PasswordInputStyles} from '../styles'
import React from 'react'

export const PasswordInput: FC<PasswordInputProps> = ({
  fontSize,
  onChangeText,
  secureTextEntry = true,
  theme,
  disabled,
  size,
  value,
  numericOnly = false,
  icon,
  ...props
}) => {
  const inputRef = useRef<any>(null)
  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const handleTextChange = (inputText: string) => {
    onChangeText!(numericOnly ? inputText.replace(/[^0-9]/g, '') : inputText)
  }

  const handleSelectionChange = ({
    nativeEvent: {selection},
  }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    if (Platform.OS === 'android') {
      // Android'de yapıştırma işlemini engelle
      const {start, end} = selection
      if (start !== end && inputRef.current)
        inputRef.current.setNativeProps({selection: {start: 0, end: 0}})
    }
  }

  return (
    <Item row>
      {icon && (
        <View style={PasswordInputStyles().leadingIcon}>
          <Icon
            {...icon}
            testID='password-leading-icon-test-id'
            name={icon.name}
            variant={icon.variant}
            width={icon.width ?? 24}
            height={icon.height ?? 24}
          />
        </View>
      )}

      <TextInput
        ref={inputRef}
        editable={!disabled}
        placeholder='*******'
        style={StyleSheet.flatten([
          InputStyles({fontSize, theme, size}).defaultTextInputStyle,
          icon ? {paddingLeft: 34} : undefined,
        ])}
        keyboardType={numericOnly ? 'number-pad' : 'default'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        value={value}
        contextMenuHidden={true} // iOS'ta yapıştırma özelliğini kapat
        onSelectionChange={handleSelectionChange} // Android'de yapıştırma işlemini engelle
        {...props}
      />

      <Pressable
        testID='show-password-icon-test-id'
        style={PasswordInputStyles().showPasswordIcon}
        justifyContentCenter
        alignItemsCenter
        onPress={() => {
          setIsSecure(!isSecure)
        }}>
        <Icon
          variant={theme === 'dark' ? 'white' : !value ? 'grey-200' : 'grey-900'}
          name={isSecure ? 'eye-disable' : 'eye'}
          height={24}
          width={24}
        />
      </Pressable>
    </Item>
  )
}
```

- [ ] **Step 5: Run tests + regenerate snapshot**

Run: `yarn jest -u src/features/Input/__tests__/PasswordInput.test.tsx`
Expected: PASS — all tests green; the obsolete snapshot is overwritten with the new render (now including the `default` keyboard).

- [ ] **Step 6: Typecheck**

Run: `yarn typecheck`
Expected: PASS — no type errors (`View` import added; `icon`/`numericOnly` destructured match Task 2 types).

- [ ] **Step 7: Commit**

```bash
git add src/features/Input/components/PasswordInput.tsx \
        src/features/Input/styles/PasswordInput.style.ts \
        src/features/Input/__tests__/PasswordInput.test.tsx \
        src/features/Input/__tests__/__snapshots__/PasswordInput.test.tsx.snap
git commit -m "fix(input): accept text passwords by default in PasswordInput

PasswordInput stripped all non-digit characters and forced a number-pad
keyboard, making text passwords impossible to type. Accept text by
default; gate digit-stripping + number-pad behind a new numericOnly prop;
add autoCapitalize=none/autoCorrect=false and an optional leading icon.

BREAKING CHANGE: digit-only behavior now requires numericOnly."
```

---

### Task 4: Bump version to 0.6.0

**Files:**
- Modify: `package.json:3`

**Interfaces:**
- Consumes: nothing.
- Produces: `version: "0.6.0"` for the publish/release step.

- [ ] **Step 1: Run the full test suite**

Run: `yarn jest`
Expected: PASS — entire suite green (Label + PasswordInput included).

- [ ] **Step 2: Bump the version**

In `package.json`, change line 3 from `"version": "0.5.2",` to:

```json
  "version": "0.6.0",
```

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: bump version to 0.6.0"
```

---

## Post-plan (handled outside task execution)

After all tasks pass and are committed, the release itself (build via
`yarn prepare`, `npm publish --access public`, push, tag `v0.6.0`, GitHub
release) is performed separately — same flow as the 0.5.2 release. Not part
of the TDD task loop.
