# Input Left/Right Icon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tüm Input ailesine Button'daki gibi `leftIcon`/`rightIcon` yapısını kazandırmak; ikon varsa render edip içeriği akışkan (`flex:1`) genişletmek/daraltmak ve handoff Bug #1 (spacing sızıntısı) + Bug #2 (ikon gap) sorunlarını kalıcı çözmek.

**Architecture:** Metin-tabanlı tipler ortak, "aptal" bir `InputField` sunum bileşeninden geçer (leftIcon + children(flex:1) + rightIcon + size-based gap). checkbox/toggle kendi bespoke düzenini korur ama paylaşılan `inputIconGapNormalizer` + `stopPropagation`'lı ikon slotları alır. Fonksiyonel trailing elemanı olan tipler (password/phone/iban/amount/date/select) yerleşik davranışı içeride koruyup görünümü `rightIcon` ile override edilebilir kılar.

**Tech Stack:** React Native 0.81, TypeScript, Jest + @testing-library/react-native, react-native-mask-input.

---

## Genel Konvansiyonlar (her task için geçerli)

- Test util importu: `import {render, fireEvent, userEvent, waitFor} from '../../../__tests__/utils/testUtils'` (test dosyasının konumuna göre göreli yol; mevcut testlerdeki yolu izle).
- Testleri çalıştırma: `yarn test <dosya-yolu>` (tek dosya) veya `yarn test -t '<test adı>'`.
- Snapshot güncelleme: `yarn test:u <dosya-yolu>`.
- Tipkontrol: `yarn typecheck`.
- İçerik sözleşmesi: `InputField`'e `children` olarak verilen içeriğin **kök stili `flex:1`** taşımalı (row içinde yatay genişleme için). Text input'larda bu `defaultTextInputStyle` üzerinden gelir; Pressable/Item köklü içeriklerde ilgili task açıkça `flex={1}` ekler.
- Commit mesajları Türkçe, conventional commits; body satırları < 100 char. Her commit öncesi kullanıcıdan onay al (proje kuralı).

---

## Dosya Yapısı

**Yeni dosyalar:**
- `src/features/Input/utils/inputIconGapNormalizer.ts` — size→gap (4/8/12)
- `src/features/Input/models/inputIconProps.interface.ts` — `InputIconProps`
- `src/features/Input/models/inputIconSlotsProps.interface.ts` — `InputIconSlotsProps`
- `src/features/Input/components/InputField.tsx` — ortak layout sarmalayıcı
- `src/features/Input/__tests__/InputField.test.tsx` — InputField testleri
- `src/features/Input/utils/__tests__/inputIconGapNormalizer.test.ts`

**Değişen (styles):** `styles/Input.style.ts`, `styles/PasswordInput.style.ts`
**Değişen (orchestration):** `components/Input.tsx`
**Değişen (Tier 1):** `DefaultInput`, `EmailInput`, `NumericInput`, `StatementInput`, `CreditCardInput`, `CVCInput`, `ExpireDateInput`, `PlateNumberInput`, `PinPasswordInput`
**Değişen (Tier 2):** `PasswordInput`, `PhoneInput`, `IbanInput`, `AmountInput`, `DateInput`, `SelectInput`
**Değişen (Tier 3):** `CheckBoxInput`, `ToggleInput`
**Değişen (models):** `baseInputProps.interface.ts` (+`InputIconSlotsProps`), `defaultInputProps` & `passwordInputProps` (`icon` kaldır), Select/Date/Amount prop arayüzleri, `models/index.ts`, `utils/index.ts`

---

# Phase 0 — Foundation

## Task 1: `inputIconGapNormalizer` util

**Files:**
- Create: `src/features/Input/utils/inputIconGapNormalizer.ts`
- Test: `src/features/Input/utils/__tests__/inputIconGapNormalizer.test.ts`
- Modify: `src/features/Input/utils/index.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/Input/utils/__tests__/inputIconGapNormalizer.test.ts
import {inputIconGapNormalizer} from '../inputIconGapNormalizer'

describe('inputIconGapNormalizer', () => {
  it('xs/sm için 4 döner', () => {
    expect(inputIconGapNormalizer('xs')).toBe(4)
    expect(inputIconGapNormalizer('sm')).toBe(4)
  })
  it('md ve tanımsız için 8 döner', () => {
    expect(inputIconGapNormalizer('md')).toBe(8)
    expect(inputIconGapNormalizer(undefined)).toBe(8)
  })
  it('lg/xl/xxl/full için 12 döner', () => {
    expect(inputIconGapNormalizer('lg')).toBe(12)
    expect(inputIconGapNormalizer('xl')).toBe(12)
    expect(inputIconGapNormalizer('xxl')).toBe(12)
    expect(inputIconGapNormalizer('full')).toBe(12)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/features/Input/utils/__tests__/inputIconGapNormalizer.test.ts`
Expected: FAIL — "Cannot find module '../inputIconGapNormalizer'".

- [ ] **Step 3: Write minimal implementation**

```ts
// src/features/Input/utils/inputIconGapNormalizer.ts
import type {Size} from '../../../models'

/** Leading/trailing ikon ile içerik arası yatay boşluk (4'ün katları, size-based). */
export const inputIconGapNormalizer = (size?: Size): number => {
  switch (size) {
    case 'xs':
    case 'sm':
      return 4
    case 'lg':
    case 'xl':
    case 'xxl':
    case 'full':
      return 12
    case 'md':
    default:
      return 8
  }
}
```

- [ ] **Step 4: Export from barrel**

`src/features/Input/utils/index.ts` içine ekle:
```ts
export * from './inputIconGapNormalizer'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `yarn test src/features/Input/utils/__tests__/inputIconGapNormalizer.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/features/Input/utils/inputIconGapNormalizer.ts src/features/Input/utils/__tests__/inputIconGapNormalizer.test.ts src/features/Input/utils/index.ts
git commit -m "feat(input): size-based ikon gap util ekle"
```

---

## Task 2: İkon slot model arayüzleri

**Files:**
- Create: `src/features/Input/models/inputIconProps.interface.ts`
- Create: `src/features/Input/models/inputIconSlotsProps.interface.ts`
- Modify: `src/features/Input/models/index.ts`
- Modify: `src/features/Input/models/baseInputProps.interface.ts`

- [ ] **Step 1: Create `InputIconProps`**

```ts
// src/features/Input/models/inputIconProps.interface.ts
import type {GestureResponderEvent} from 'react-native'

import type {IconProps} from '../../Icon'

/** InputField slotlarında kullanılan ikon prop'u: IconProps + opsiyonel onPress. */
export interface InputIconProps extends IconProps {
  onPress?: (event: GestureResponderEvent) => void
}
```

- [ ] **Step 2: Create `InputIconSlotsProps`**

```ts
// src/features/Input/models/inputIconSlotsProps.interface.ts
import type {InputIconProps} from './inputIconProps.interface'

export interface InputIconSlotsProps {
  leftIcon?: InputIconProps
  rightIcon?: InputIconProps
}
```

- [ ] **Step 3: `BaseInputProps`'a mixin ekle**

`src/features/Input/models/baseInputProps.interface.ts`:
```ts
import type {TextInputProps} from 'react-native'

import {type CommonUiProps, type Theme, type Variant} from '../../../models'
import {InputIconSlotsProps} from './inputIconSlotsProps.interface'
import {InputLabelProps} from './inputLabelProps.interface'
import {InputType} from './inputType.type'

/** Tüm input tiplerinde ortak olarak kullanılan propertylerdir. */
export interface BaseInputProps extends CommonUiProps, TextInputProps, InputIconSlotsProps {
  name: string
  type?: InputType
  label?: string | InputLabelProps
  disabled?: boolean
  isLoading?: boolean
  errorMessage?: string
  theme?: Theme
  renderSeparator?: boolean
  border?: {
    width?: number
    variant?: Variant
    radius?: number
  }
  touched?: Nullable<boolean>
}
```

- [ ] **Step 4: Barrel export**

`src/features/Input/models/index.ts` başına ekle:
```ts
export * from './inputIconProps.interface'
export * from './inputIconSlotsProps.interface'
```

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`
Expected: `icon` hâlâ tanımlı olduğundan hata yok (icon kaldırma Task 6'da). PASS.

- [ ] **Step 6: Commit**

```bash
git add src/features/Input/models/inputIconProps.interface.ts src/features/Input/models/inputIconSlotsProps.interface.ts src/features/Input/models/baseInputProps.interface.ts src/features/Input/models/index.ts
git commit -m "feat(input): leftIcon/rightIcon model arayuzlerini ekle"
```

---

## Task 3: `InputField` bileşeni

**Files:**
- Create: `src/features/Input/components/InputField.tsx`
- Test: `src/features/Input/__tests__/InputField.test.tsx`
- Modify: `src/features/Input/components/index.ts`

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/Input/__tests__/InputField.test.tsx
import React from 'react'
import {Text} from 'react-native'

import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {InputField} from '../components/InputField'

describe('InputField', () => {
  const child = <Text testID='field-child'>child</Text>

  it('sadece children verilince ikon render etmez', async () => {
    const {queryByTestId, getByTestId} = await render(<InputField size='md'>{child}</InputField>)
    expect(getByTestId('field-child')).toBeTruthy()
    expect(queryByTestId('input-field-left-icon')).toBeNull()
    expect(queryByTestId('input-field-right-icon')).toBeNull()
  })

  it('leftIcon verilince sol ikon render eder', async () => {
    const {getByTestId} = await render(
      <InputField size='md' leftIcon={{name: 'lock'}}>{child}</InputField>
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('rightIcon verilince sağ ikon render eder', async () => {
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye'}}>{child}</InputField>
    )
    expect(getByTestId('input-field-right-icon')).toBeTruthy()
  })

  it('onPress verilince ikon tıklanabilir olur ve çağrılır', async () => {
    const onPress = jest.fn()
    const {getByTestId} = await render(
      <InputField size='md' rightIcon={{name: 'eye', onPress}}>{child}</InputField>
    )
    fireEvent.press(getByTestId('input-field-right-icon'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/features/Input/__tests__/InputField.test.tsx`
Expected: FAIL — "Cannot find module '../components/InputField'".

- [ ] **Step 3: Write implementation**

```tsx
// src/features/Input/components/InputField.tsx
import React, {type FC, type PropsWithChildren} from 'react'

import {type GestureResponderEvent} from 'react-native'

import {type Size} from '../../../models'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import type {InputIconProps} from '../models'
import {inputIconGapNormalizer, InputStyleNormalizer} from '../utils'

interface InputFieldProps extends PropsWithChildren {
  size?: Size
  leftIcon?: InputIconProps
  rightIcon?: InputIconProps
  /** checkbox/toggle gibi kök Pressable'ı olan tiplerde ikon tıklamasının köke sızmasını engeller. */
  stopPropagation?: boolean
}

interface IconSlotProps {
  icon: InputIconProps
  side: 'left' | 'right'
  gap: number
  size?: Size
  stopPropagation?: boolean
  testID: string
}

const IconSlot: FC<IconSlotProps> = ({icon, side, gap, size, stopPropagation, testID}) => {
  const {onPress, width, height, ...iconProps} = icon
  const spacing = side === 'left' ? {marginRight: gap} : {marginLeft: gap}
  const fallback = InputStyleNormalizer({size}).icon

  const iconElement = (
    <Icon width={width ?? fallback.width} height={height ?? fallback.height} {...iconProps} />
  )

  if (!onPress) {
    return (
      <Item testID={testID} flex={0} {...spacing}>
        {iconElement}
      </Item>
    )
  }

  return (
    <Pressable
      testID={testID}
      flex={0}
      alignItemsCenter
      justifyContentCenter
      {...spacing}
      onPress={(event: GestureResponderEvent) => {
        if (stopPropagation) event?.stopPropagation?.()
        onPress(event)
      }}>
      {iconElement}
    </Pressable>
  )
}

/**
 * Metin-tabanlı input tipleri için ortak layout sarmalayıcı.
 * children'ın kök stili flex:1 taşımalıdır (yatay genişleme için).
 */
export const InputField: FC<InputFieldProps> = ({
  size,
  leftIcon,
  rightIcon,
  stopPropagation,
  children,
}) => {
  const gap = inputIconGapNormalizer(size)

  return (
    <Item row alignItemsCenter>
      {leftIcon && (
        <IconSlot
          testID='input-field-left-icon'
          icon={leftIcon}
          side='left'
          gap={gap}
          size={size}
          stopPropagation={stopPropagation}
        />
      )}

      {children}

      {rightIcon && (
        <IconSlot
          testID='input-field-right-icon'
          icon={rightIcon}
          side='right'
          gap={gap}
          size={size}
          stopPropagation={stopPropagation}
        />
      )}
    </Item>
  )
}
```

- [ ] **Step 4: Export from barrel**

`src/features/Input/components/index.ts` sonuna ekle:
```ts
export * from './InputField'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `yarn test src/features/Input/__tests__/InputField.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/features/Input/components/InputField.tsx src/features/Input/__tests__/InputField.test.tsx src/features/Input/components/index.ts
git commit -m "feat(input): ortak InputField layout bileseni ekle"
```

---

## Task 4: `defaultTextInputStyle` → `flex:1` (Bug #2 temeli)

**Files:**
- Modify: `src/features/Input/styles/Input.style.ts`

- [ ] **Step 1: `width:'100%'` yerine `flex:1`**

`src/features/Input/styles/Input.style.ts` içinde `defaultTextInputStyle`:
```ts
    defaultTextInputStyle: {
      ...commonUiStyleProperties(props),

      flex: 1,
      height: InputStyleNormalizer({size: props?.size}).height,
      fontSize: props?.fontSize
        ? fontSizeNormalizer(props?.fontSize)
        : fontSizeNormalizer(InputStyleNormalizer({size: props?.size}).placeholderSize),
      color: props?.theme === 'light' ? themeConfig.colors['grey-900'] : themeConfig.colors.white,

      // TODO: Android sorunu çözüldükten sonra bakılması gerekiyor.
      letterSpacing: props?.letterSpacing ?? 0.5,
      fontFamily: 'Markpro-Medium',
    } as any,
```

- [ ] **Step 2: Snapshot güncelle**

Run: `yarn test:u src/features/Input`
Expected: Snapshot'lar `width:'100%'` → `flex:1` olarak güncellenir; testler PASS.

- [ ] **Step 3: Commit**

```bash
git add src/features/Input/styles/Input.style.ts 'src/features/Input/**/__snapshots__/*'
git commit -m "fix(input): TextInput genisligini flex:1 ile akiskan yap"
```

---

# Phase 1 — Orchestration & Bug #1 (dış spacing)

## Task 5: `Input.tsx` — dış spacing'i kök Item'a al, child'a sızdırma

**Files:**
- Modify: `src/features/Input/components/Input.tsx`
- Test: `src/features/Input/__tests__/Input.test.tsx`

**Yaklaşım:** `Input.tsx` şu an tüm `props`'u child field bileşenlerine spread ediyor; margin/padding gibi dış spacing prop'ları bu yüzden TextInput stiline sızıyor. Çözüm: spacing prop'larını `props`'tan ayır, kök `<Item>`'a uygula, child'a spread edilen nesneden çıkar.

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/Input/__tests__/Input.test.tsx (yeni test ekle)
import {StyleSheet} from 'react-native'

it('marginBottom dış kök Item’a uygulanır, TextInput style’ına sızmaz', async () => {
  const {getByTestId} = await render(
    <Input type='default' name='email' size='md' marginBottom={16} testID='outer-input' />
  )
  const input = getByTestId('default-input-test-id')
  const flat = StyleSheet.flatten(input.props.style)
  expect(flat.marginBottom).toBeUndefined()
})
```
> Not: `default-input-test-id` DefaultInput'un `type='default'` dalındaki TextInput'a Task 6'da eklenir. Bu test Task 6 ile birlikte geçerli olur; sıralamada Task 5 commit'i yalnızca Input.tsx spacing ayrımını içerir, testi Task 6 sonrası koştur.

- [ ] **Step 2: `Input.tsx`'te spacing ayrımı**

`Input.tsx` içinde `getInputElement`'ten önce spacing prop'larını ayır:
```tsx
  const {
    marginTop, marginBottom, marginLeft, marginRight, marginVertical, marginHorizontal,
    ...fieldProps
  } = props

  const outerSpacing = {
    marginTop, marginBottom, marginLeft, marginRight, marginVertical, marginHorizontal,
  }
```
Ardından `getInputElement` içindeki tüm `{...props}` kullanımlarını `{...fieldProps}` ile değiştir:
```tsx
    switch (type) {
      case 'default':
        return <DefaultInput {...initializedProps} {...fieldProps} />
      // ... diğer tüm case'lerde {...props} → {...fieldProps}
```
Ve en dıştaki kök `<Item>`'a spacing uygula:
```tsx
  return (
    <Item {...outerSpacing}>
      <Item
        paddingTop={label && type !== 'toggle' ? 16 : 0}
        style={InputStyles({disabled}).textInputContainer}>
        {/* ... değişmeden ... */}
```

- [ ] **Step 3: Typecheck**

Run: `yarn typecheck`
Expected: PASS.

- [ ] **Step 4: Var olan Input testleri geçmeli**

Run: `yarn test src/features/Input/__tests__/Input.test.tsx`
Expected: Mevcut testler PASS (yeni marginBottom testi Task 6 sonrası aktif).

- [ ] **Step 5: Commit**

```bash
git add src/features/Input/components/Input.tsx src/features/Input/__tests__/Input.test.tsx
git commit -m "fix(input): dis spacing'i kok Item'a uygula, TextInput'a sizdirma"
```

---

# Phase 2 — Tier 1 (nötr metin tipleri)

## Task 6: `DefaultInput` — InputField + leftIcon/rightIcon, icon kaldır

**Files:**
- Modify: `src/features/Input/components/DefaultInput.tsx`
- Modify: `src/features/Input/models/defaultInputProps.interface.ts`
- Test: `src/features/Input/__tests__/DefaultInput.test.tsx`

- [ ] **Step 1: Model — `icon` kaldır, slotlar `BaseInputProps`'tan gelir**

```ts
// src/features/Input/models/defaultInputProps.interface.ts
import type {BaseInputProps} from './baseInputProps.interface'
import type {InputKeyboardType} from './inputKeyboardType.type'

export interface DefaultInputProps extends BaseInputProps {
  type?: 'default'
  keyboard?: InputKeyboardType
}
```

- [ ] **Step 2: Testleri güncelle (icon → leftIcon; test id'ler)**

`DefaultInput.test.tsx` alt describe'ını güncelle:
```tsx
describe('DefaultInput -> leading icon tint', () => {
  it('forwards variant to the leading Icon', async () => {
    const {getByTestId} = await render(
      <DefaultInput name='i1' type='default' leftIcon={{name: 'lock', variant: 'primary'}} />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
  })

  it('leftIcon ve rightIcon birlikte render edilir', async () => {
    const {getByTestId} = await render(
      <DefaultInput
        name='i2'
        type='default'
        leftIcon={{name: 'lock'}}
        rightIcon={{name: 'eye'}}
      />
    )
    expect(getByTestId('input-field-left-icon')).toBeTruthy()
    expect(getByTestId('input-field-right-icon')).toBeTruthy()
  })
})
```
> Eski `default-input-icon-test-id`'ye dayanan iki testi yukarıdakiyle değiştir.

- [ ] **Step 3: `DefaultInput` implementasyonu**

```tsx
// src/features/Input/components/DefaultInput.tsx
import {useCallback, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {DefaultInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const DefaultInput: FC<DefaultInputProps> = ({
  label,
  placeholder,
  fontSize,
  theme,
  disabled,
  size,
  leftIcon,
  rightIcon,
  keyboard = 'default',
  onChangeText,
  // InputField / Input-level prop'ları TextInput'a sızmasın
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const handleChangeText = useCallback(
    (value: string) => {
      if (keyboard === 'default') {
        if (!props?.maxLength) {
          onChangeText?.(value)
          return
        }
        onChangeText?.(value.length > props?.maxLength ? value.slice(0, props?.maxLength) : value)
        return
      } else if (keyboard === 'alphanumeric') {
        const formattedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9 .]/g, '')
        if (!props?.maxLength) {
          onChangeText?.(formattedValue)
          return
        }
        onChangeText?.(
          formattedValue.length > props?.maxLength
            ? formattedValue.slice(0, props?.maxLength)
            : formattedValue
        )
      }
    },
    [props?.maxLength, onChangeText]
  )

  const textInput = (
    <TextInput
      testID='default-input-test-id'
      editable={!disabled}
      keyboardType='default'
      autoCapitalize='none'
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([
        InputStyles({fontSize, theme, size, includeBorderRadius: true}).defaultTextInputStyle,
      ])}
      onChangeText={handleChangeText}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return textInput

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {textInput}
    </InputField>
  )
}
```
> Not: `...props` artık yalnızca gerçek `TextInputProps` (value, onBlur, maxLength, readOnly...) içerir; `InputStyles`'a geçilmez (Bug #1). Spacing prop'ları zaten `Input.tsx`'te ayrıştırıldı.

- [ ] **Step 4: Testleri çalıştır**

Run: `yarn test src/features/Input/__tests__/DefaultInput.test.tsx`
Expected: PASS. Ardından Task 5'teki `marginBottom` testini de koştur:
Run: `yarn test src/features/Input/__tests__/Input.test.tsx`
Expected: PASS (marginBottom TextInput style'ında yok).

- [ ] **Step 5: Snapshot güncelle**

Run: `yarn test:u src/features/Input/__tests__/DefaultInput.test.tsx src/features/Input/__tests__/Input.test.tsx`

- [ ] **Step 6: Commit**

```bash
git add src/features/Input/components/DefaultInput.tsx src/features/Input/models/defaultInputProps.interface.ts src/features/Input/__tests__/DefaultInput.test.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): DefaultInput'a leftIcon/rightIcon; icon prop'unu kaldir"
```

---

## Task 7: `EmailInput`, `NumericInput`, `StatementInput` — InputField sarımı

**Files:**
- Modify: `src/features/Input/components/EmailInput.tsx`, `NumericInput.tsx`, `StatementInput.tsx`

Bu üç tip `BaseInputProps`'tan `leftIcon`/`rightIcon` alır (model değişmez). Her biri TextInput'unu `InputField` ile sarar; `StatementInput` ayrıca `InputStyles`'a `...props` geçmeyi bırakır (Bug #1).

- [ ] **Step 1: `EmailInput`**

```tsx
// src/features/Input/components/EmailInput.tsx
import {useCallback, useState, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {EmailInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const EmailInput: FC<EmailInputProps> = ({
  disabled,
  fontSize,
  theme,
  size,
  leftIcon,
  rightIcon,
  onChangeText,
  value: propValue,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const [value, setValue] = useState<string>(propValue || '')

  const handleChangeText = useCallback(
    (text: string) => {
      setValue(text)
      !!onChangeText && onChangeText(text)
    },
    [onChangeText]
  )

  const textInput = (
    <TextInput
      testID='email-input-test-id'
      editable={!disabled}
      placeholder='example@email.com'
      keyboardType='email-address'
      autoCapitalize='none'
      onChangeText={handleChangeText}
      value={value}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return textInput

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {textInput}
    </InputField>
  )
}
```

- [ ] **Step 2: `NumericInput`**

```tsx
// src/features/Input/components/NumericInput.tsx
import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {NumericInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const NumericInput: FC<NumericInputProps> = ({
  label,
  placeholder,
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    onChangeText!(inputText.replace(/[^0-9]/g, ''))
  }

  const textInput = (
    <TextInput
      testID='numeric-input-test-id'
      editable={!disabled}
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      keyboardType='number-pad'
      onChangeText={handleTextChange}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return textInput

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {textInput}
    </InputField>
  )
}
```

- [ ] **Step 3: `StatementInput` (Bug #1 dahil)**

```tsx
// src/features/Input/components/StatementInput.tsx
import {useCallback, useMemo} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {StatementInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const StatementInput: React.FC<StatementInputProps> = ({
  disabled,
  placeholder,
  label,
  fontSize,
  theme,
  size,
  maxLength,
  onChangeText,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const handleChangeText = useCallback(
    (value: string) => {
      const formattedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9 .,\-/]/g, '')
      if (!maxLength) {
        onChangeText?.(formattedValue)
        return
      }
      onChangeText?.(
        formattedValue.length > maxLength ? formattedValue.slice(0, maxLength) : formattedValue
      )
    },
    [maxLength, onChangeText]
  )

  const inputStyles = useMemo(
    () => InputStyles({fontSize, theme, size, includeBorderRadius: true}).defaultTextInputStyle,
    [fontSize, theme, size]
  )

  const textInput = (
    <TextInput
      testID='statement-input-test-id'
      keyboardType='default'
      autoCapitalize='none'
      editable={!disabled}
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([inputStyles])}
      onChangeText={handleChangeText}
      maxLength={maxLength}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return textInput

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {textInput}
    </InputField>
  )
}
```

- [ ] **Step 4: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/StatementInput.test.tsx`
Expected: PASS. Gerekirse `yarn test:u src/features/Input`.

- [ ] **Step 5: Commit**

```bash
git add src/features/Input/components/EmailInput.tsx src/features/Input/components/NumericInput.tsx src/features/Input/components/StatementInput.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): email/numeric/statement InputField sarimi + spacing fix"
```

---

## Task 8: Mask tabanlı Tier 1 (`CreditCardInput`, `CVCInput`, `ExpireDateInput`, `PlateNumberInput`, `PinPasswordInput`)

**Files:**
- Modify: ilgili 5 bileşen.

Bu tipler `MaskInput`/`TextInput` kullanır ve `BaseInputProps`'tan slot alır. Her biri içeriğini `InputField` ile sarar. Örnek olarak `CreditCardInput` tam kod; diğerleri aynı desende (mask/keyboard kendi mantığı korunur).

- [ ] **Step 1: `CreditCardInput`**

```tsx
// src/features/Input/components/CreditCardInput.tsx
import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import type {CreditCardInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

import MaskInput from 'react-native-mask-input'
import React from 'react'

export const CreditCardInput: FC<CreditCardInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const MASK = [
    /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,
  ]

  const handleOnChangeText = (text: string) => {
    onChangeText!(text.replace(/[^0-9]/g, ''))
  }

  const maskInput = (
    <MaskInput
      testID='credit-card-input-test-id'
      editable={!disabled}
      mask={MASK}
      placeholder='**** **** **** ****'
      keyboardType='number-pad'
      maxLength={19}
      onChangeText={(_masked, unmasked) => handleOnChangeText(unmasked)}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return maskInput

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {maskInput}
    </InputField>
  )
}
```

- [ ] **Step 2: `CVCInput`, `ExpireDateInput`, `PlateNumberInput`, `PinPasswordInput`**

Her biri kendi mevcut mask/keyboard/format mantığını **koruyarak** aynı deseni uygular:
1. Prop imzasına `leftIcon, rightIcon` ekle ve `name/errorMessage/border/touched/renderSeparator` prop'larını `_` ile ayıklayarak `...props`'tan çıkar.
2. Mevcut `<MaskInput>`/`<TextInput>`'i bir değişkene al (`const field = (...)`).
3. `if (!leftIcon && !rightIcon) return field`
4. Aksi halde `return <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>{field}</InputField>`
5. Bu tiplerde şu an `<Item row>` sarmalayıcı varsa kaldır (InputField zaten row sağlıyor); yoksa dokunma.

`PinPasswordInput` için mevcut kök `<Item row>`'u InputField ile değiştir:
```tsx
// src/features/Input/components/PinPasswordInput.tsx (return bloğu)
  const pinInput = (
    <TextInput
      testID='pin-password-input-test-id'
      editable={!disabled}
      placeholder='____'
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      keyboardType='number-pad'
      maxLength={4}
      secureTextEntry={true}
      onChangeText={handleTextChange}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return pinInput
  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {pinInput}
    </InputField>
  )
```

- [ ] **Step 3: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/CreditCardInput.test.tsx src/features/Input/__tests__/CVC.test.tsx src/features/Input/__tests__/ExpireDateInput.test.tsx src/features/Input/__tests__/PlateNumberInput.test.tsx src/features/Input/__tests__/PinPasswordInput.test.tsx`
Expected: PASS. Gerekirse `yarn test:u`.

- [ ] **Step 4: Commit**

```bash
git add src/features/Input/components/CreditCardInput.tsx src/features/Input/components/CVCInput.tsx src/features/Input/components/ExpireDateInput.tsx src/features/Input/components/PlateNumberInput.tsx src/features/Input/components/PinPasswordInput.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): mask tabanli Tier 1 tiplerine leftIcon/rightIcon"
```

---

# Phase 3 — Tier 2 (fonksiyonel trailing)

## Task 9: `PasswordInput` — göz toggle'ı rightIcon üzerinden, leadingIcon absolute kaldır

**Files:**
- Modify: `src/features/Input/components/PasswordInput.tsx`
- Modify: `src/features/Input/models/passwordInputProps.interface.ts`
- Modify: `src/features/Input/styles/PasswordInput.style.ts`
- Test: `src/features/Input/__tests__/PasswordInput.test.tsx`

- [ ] **Step 1: Model — `icon` kaldır**

```ts
// src/features/Input/models/passwordInputProps.interface.ts
import type {BaseInputProps} from './baseInputProps.interface'

export interface PasswordInputProps extends BaseInputProps {
  type?: 'password'
  /** When true, restrict input to digits and use a numeric keyboard (PIN-style). Default: false. */
  numericOnly?: boolean
}
```

- [ ] **Step 2: Testleri uyarlama**

Mevcut testler `showPasswordIconTestId = 'show-password-icon-test-id'` ve `leadingIconTestId = 'password-leading-icon-test-id'` kullanıyor. Yeni yapıda:
- Göz ikonu artık InputField sağ slotu: testID'yi koru → IconSlot'a özel testID geçmek için PasswordInput göz slotunu `rightIcon={{... , testID: 'show-password-icon-test-id'}}` ile kurar; `IconProps` `testID` destekler (SvgProps). Böylece mevcut press testi (`fireEvent.press(getByTestId('show-password-icon-test-id'))`) çalışır — ancak press slot Pressable'ında olduğundan slot testID'sini kullanmak gerekir.

Bu nedenle press testini InputField slot testID'sine göre güncelle:
```tsx
it('sifre goster iconuna tiklandiginda sifre gorunur olmali', async () => {
  const {getByTestId} = await render(<PasswordInput name='test' testID={inputTestId} />)
  const inputElement = getByTestId(inputTestId)
  expect(inputElement).toHaveProp('secureTextEntry', true)
  fireEvent.press(getByTestId('input-field-right-icon'))
  expect(inputElement).toHaveProp('secureTextEntry', false)
})
```
Ve leading icon testini `leftIcon` ile güncelle:
```tsx
it('leftIcon verildiğinde leading icon render edilmeli', async () => {
  const {getByTestId} = await render(
    <PasswordInput name='test' testID={inputTestId} leftIcon={{name: 'lock'}} />
  )
  expect(getByTestId('input-field-left-icon')).toBeTruthy()
})
```
"ilk render'da göz ikonu görünmeli" testini `input-field-right-icon` ile güncelle.

- [ ] **Step 3: `PasswordInput` implementasyonu**

```tsx
// src/features/Input/components/PasswordInput.tsx
import {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import type {PasswordInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
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
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
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
      const {start, end} = selection
      if (start !== end && inputRef.current)
        inputRef.current.setNativeProps({selection: {start: 0, end: 0}})
    }
  }

  // Yerleşik göz toggle'ı: fonksiyon sabit, görünüm rightIcon ile override edilebilir.
  const eyeVariant = theme === 'dark' ? 'white' : !value ? 'grey-200' : 'grey-900'
  const builtInEye = {
    name: (isSecure ? 'eye-disable' : 'eye') as any,
    variant: eyeVariant,
    width: 24,
    height: 24,
    ...rightIcon, // sadece görünüm override (name/variant/width/height...)
    onPress: () => setIsSecure((prev) => !prev), // fonksiyon her zaman yerleşik
  }

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={builtInEye}>
      <TextInput
        testID='input-test-id'
        ref={inputRef}
        editable={!disabled}
        placeholder='*******'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType={numericOnly ? 'number-pad' : 'default'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        value={value}
        contextMenuHidden={true}
        onSelectionChange={handleSelectionChange}
        {...props}
      />
    </InputField>
  )
}
```
> `testID='input-test-id'` mevcut testlerdeki `inputTestId` ile uyum için sabitlendi; `{...props}` içinden gelen `testID` bunu override eder (mevcut testler `testID={inputTestId}` veriyor).

- [ ] **Step 4: `PasswordInput.style.ts` sadeleştir**

Absolute `leadingIcon` ve `showPasswordIcon` artık kullanılmıyor. Dosyayı kaldırmak yerine boş obje bırakmak import zincirini bozabilir; güvenli yol: stilleri kaldırıp dosyayı export'tan çıkar.
1. `src/features/Input/styles/index.ts` içinden `PasswordInputStyles` export'unu kaldır.
2. `src/features/Input/styles/PasswordInput.style.ts` dosyasını sil.
3. Başka kullanan yer olmadığını doğrula: `rg PasswordInputStyles src` → sadece silinen dosya.

- [ ] **Step 5: Testler**

Run: `yarn test src/features/Input/__tests__/PasswordInput.test.tsx`
Expected: PASS (toggle, secureTextEntry, leftIcon, right slot).
Run: `yarn test:u src/features/Input/__tests__/PasswordInput.test.tsx`

- [ ] **Step 6: Commit**

```bash
git add src/features/Input/components/PasswordInput.tsx src/features/Input/models/passwordInputProps.interface.ts src/features/Input/styles/index.ts src/features/Input/__tests__/PasswordInput.test.tsx 'src/features/Input/**/__snapshots__/*'
git rm src/features/Input/styles/PasswordInput.style.ts
git commit -m "feat(input): PasswordInput goz toggle'ini rightIcon uzerinden yonet"
```

---

## Task 10: `PhoneInput` — rehber ikonu rightIcon üzerinden

**Files:**
- Modify: `src/features/Input/components/PhoneInput.tsx`
- Test: `src/features/Input/__tests__/PhoneInput.test.tsx`

**Yaklaşım:** `selectContacts` true iken rehber ikonu yerleşik `rightIcon` olur (onPress = izin akışı). `absolute right/bottom` blok kaldırılır; `MaskInput` InputField içinde.

- [ ] **Step 1: Implementasyon**

```tsx
// src/features/Input/components/PhoneInput.tsx
import React, {type FC} from 'react'

import {PermissionsAndroid, Platform, StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'
import type {PhoneInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

import MaskInput from 'react-native-mask-input'
import {selectContactPhone} from 'react-native-select-contact'

export const PhoneInput: FC<PhoneInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  selectContacts = true,
  maxLength = 16,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const MASK = ['0', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]

  const handleTextChange = (inputText: string) => {
    const formattedText = inputText.replace(/^(\+90|90|0)/, '').replace(/[^0-9]/g, '')
    onChangeText!('0' + formattedText)
  }

  const getPhoneNumberFromContact = async () => {
    selectContactPhone()
      .then((selection) => {
        if (!selection) return null
        const {selectedPhone} = selection
        return handleTextChange(selectedPhone?.number?.replace(/^(\+90|90|0)/, ''))
      })
      .catch(() => handleTextChange(''))
  }

  const getPhoneNumberPermissionRequest = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) await getPhoneNumberFromContact()
    } catch (err) {
      console.error(err)
    }
  }

  const contactIcon = selectContacts
    ? {
        name: 'phone-book' as any,
        color: themeConfig.colors['grey-200'],
        width: 24,
        height: 24,
        ...rightIcon,
        onPress: () => {
          if (Platform.OS === 'android') getPhoneNumberPermissionRequest()
          else getPhoneNumberFromContact()
        },
      }
    : rightIcon

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={contactIcon}>
      <MaskInput
        testID='phone-input-test-id'
        editable={!disabled}
        mask={MASK}
        maxLength={maxLength >= 16 ? 16 : maxLength}
        placeholder='0(XXX) XXX XX XX'
        keyboardType='number-pad'
        onChangeText={(_masked, unmasked) => handleTextChange(unmasked)}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        {...props}
      />
    </InputField>
  )
}
```
> Rehber press testID'si `phone-icon-test-id`'den `input-field-right-icon`'a taşınır; testi güncelle.

- [ ] **Step 2: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/PhoneInput.test.tsx` → gerekiyorsa testID güncelle + `yarn test:u`.

- [ ] **Step 3: Commit**

```bash
git add src/features/Input/components/PhoneInput.tsx src/features/Input/__tests__/PhoneInput.test.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): PhoneInput rehber ikonunu rightIcon uzerinden yonet"
```

---

## Task 11: `IbanInput` — mevcut rightIcon'u yeni sözleşmeye uyarlama

**Files:**
- Modify: `src/features/Input/components/IbanInput.tsx`
- Test: `src/features/Input/__tests__/IbanInput.test.tsx`

**Yaklaşım:** temizle/QR fonksiyonu sabit; `rightIcon` yalnızca QR ikonunun görünümünü özelleştirir. `absolute right/bottom` blok kaldırılır.

- [ ] **Step 1: Implementasyon**

```tsx
// src/features/Input/components/IbanInput.tsx
import {type FC} from 'react'

import {StyleSheet, type GestureResponderEvent} from 'react-native'

import type {IbanInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

import MaskInput from 'react-native-mask-input'
import React from 'react'

export const IbanInput: FC<IbanInputProps> = ({
  fontSize = 'md',
  onChangeText,
  theme,
  disabled,
  size,
  value,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const clearIconVisible = value !== 'TR' && !value?.isEmpty()
  const MASK = [
    'TR', /\d/, /\d/, ' ', /[\d*]/, /[\d*]/, /[\d*]/, /[\d*]/, ' ', /[\d*]/, /[\d*]/, /[\d*]/, /[\d*]/,
    ' ', /[\d*]/, /[\d*]/, /[\d*]/, /[\d*]/, ' ', /[\d*]/, /[\d*]/, /[\d*]/, /[\d*]/, ' ',
    /[\d*]/, /[\d*]/, /\d/, /\d/, ' ', /\d/, /\d/,
  ]

  const handleTextChange = (inputText: string) => {
    const isValue = inputText === '' ? '' : 'TR' + inputText.replace(/[^0-9]/g, '')
    onChangeText!(isValue)
  }

  const trailingIcon = {
    name: (clearIconVisible ? 'remove-circle' : 'qr-iban') as any,
    variant: 'grey-200' as const,
    noStroke: clearIconVisible,
    width: 24,
    height: 24,
    ...rightIcon,
    onPress: (event: GestureResponderEvent) => {
      if (clearIconVisible) handleTextChange('TR')
      else rightIcon?.onPress?.(event)
    },
  }

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={trailingIcon}>
      <MaskInput
        editable={!disabled}
        testID='iban-input-test-id'
        mask={MASK}
        placeholder='TR00 0000 0000 0000 0000 0000 00'
        keyboardType='number-pad'
        maxLength={34}
        onChangeText={(_masked, unmasked) => {
          if (unmasked.length === 0) handleTextChange('TR')
          else if (unmasked.length <= 32) handleTextChange(unmasked)
        }}
        onFocus={() => value === '' && handleTextChange('TR')}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        numberOfLines={1}
        value={value}
        {...props}
      />
    </InputField>
  )
}
```
> Not: QR modunda `rightIcon.onPress` korunur (temizle modunda daima temizler). `clear-iban-icon-test-id`/`qr-iban-icon-test-id`'ye dayanan testleri `input-field-right-icon` + `value` durumuna göre güncelle.

- [ ] **Step 2: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/IbanInput.test.tsx` → güncelle + `yarn test:u`.

- [ ] **Step 3: Commit**

```bash
git add src/features/Input/components/IbanInput.tsx src/features/Input/__tests__/IbanInput.test.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): IbanInput temizle/QR ikonunu yeni rightIcon sozlesmesine uyarla"
```

---

## Task 12: `AmountInput` — para birimi ikonu rightIcon, ikili alan flex:1

**Files:**
- Modify: `src/features/Input/components/AmountInput/components/AmountInput.tsx`
- Modify: `src/features/Input/components/AmountInput/models/*` (leftIcon/rightIcon; BaseInputProps'tan gelmiyorsa ekle)
- Test: `src/features/Input/components/AmountInput/__tests__/AmountInput.test.tsx`

**Yaklaşım:** İkili alan bloğu (`<Item row>...</Item>`) InputField'e `children` olur ve kök stiline `flex:1` alır. Para birimi ikonu (`currencyType`) yerleşik `rightIcon` olur; `absolute right/bottom` blok kaldırılır.

- [ ] **Step 1: Prop arayüzüne slot ekle (BaseInputProps değilse)**

`AmountInputProps` `BaseInputProps`'u extend etmiyorsa `InputIconSlotsProps`'u ekle:
```ts
import type {InputIconSlotsProps} from '../../../models'
export interface AmountInputProps extends /* mevcut */ , InputIconSlotsProps { /* ... */ }
```

- [ ] **Step 2: Implementasyon (return bloğu)**

```tsx
  const currencyIcon = {
    name: currencyType as any,
    color: themeConfig.colors['grey-200'],
    width: 24,
    height: 24,
    ...rightIcon,
  }

  return (
    <Item relative onTouchStart={() => amountRef.current?.focus()}>
      <InputField size={size} leftIcon={leftIcon} rightIcon={currencyIcon}>
        <Item row flex={1} {...props}>
          {/* mevcut amount TextInput + virgül Label + currency TextInput — değişmez */}
        </Item>
      </InputField>
    </Item>
  )
```
> Eski `<Item absolute right={0} bottom=...>` para birimi bloğu kaldırılır. İç ikili alan `flex={1}` alır.

- [ ] **Step 3: Testler + snapshot**

Run: `yarn test src/features/Input/components/AmountInput/__tests__/AmountInput.test.tsx` → `currency-icon-test-id`'yi `input-field-right-icon`'a çevir + `yarn test:u`.

- [ ] **Step 4: Commit**

```bash
git add src/features/Input/components/AmountInput 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): AmountInput para birimi ikonunu rightIcon uzerinden yonet"
```

---

## Task 13: `DateInput` (viewType='input') — takvim ikonu rightIcon + Bug #1

**Files:**
- Modify: `src/features/Input/components/DateInput/components/DateInput.tsx`
- Modify: `src/features/Input/components/DateInput/models/*` (slot ekle)
- Test: `src/features/Input/__tests__/DateInput.test.tsx`

**Yaklaşım:** `viewType='input'` dalında değer `Pressable`'ı InputField children olur (kök `flex:1`); takvim ikonu yerleşik `rightIcon` (onPress = picker aç). `InputStyles({...props})` → `...props` kaldırılır (Bug #1). `viewType='button'` dalı değişmez.

- [ ] **Step 1: Prop arayüzüne slot ekle** (BaseInputProps değilse `InputIconSlotsProps` ekle).

- [ ] **Step 2: `viewType='input'` bloğu**

```tsx
  const openPicker = () => {
    if (disabled) return
    mode.includes('modal') ? showModalDatePicker() : showNativeDatePicker()
  }

  const calendarIcon = {
    name: 'calendar' as any,
    color: themeConfig.colors['grey-200'],
    mode: 'stroke' as const,
    strokeWidth: 2,
    width: InputStyleNormalizer({size}).icon.width,
    height: InputStyleNormalizer({size}).icon.height,
    ...rightIcon,
    onPress: openPicker,
  }

  return (
    <>
      {viewType === 'input' && (
        <InputField size={size} leftIcon={leftIcon} rightIcon={calendarIcon}>
          <Pressable
            flex={1}
            height={InputStyleNormalizer({size}).height}
            testID={testID ?? 'date-input-value-container'}
            justifyContentCenter
            textSize='lg'
            text={/* mevcut text hesabı — değişmez */}
            textStyle={DateInputStyles().pressableTextStyle}
            style={StyleSheet.flatten([
              InputStyles({theme, size, includeBorderRadius: true}).defaultTextInputStyle,
            ])}
            textVariant={theme === 'dark' ? 'white' : value ? 'grey-900' : 'grey-200'}
            onPress={openPicker}
          />
        </InputField>
      )}

      {viewType === 'button' && (/* mevcut Button bloğu — değişmez */)}
    </>
  )
```

- [ ] **Step 3: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/DateInput.test.tsx` → gerekiyorsa güncelle + `yarn test:u`.

- [ ] **Step 4: Commit**

```bash
git add src/features/Input/components/DateInput 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): DateInput takvim ikonunu rightIcon uzerinden yonet + spacing fix"
```

---

## Task 14: `SelectInput`/`multiSelect` — chevron rightIcon

**Files:**
- Modify: `src/features/Input/components/SelectInput/components/SelectInput.tsx`
- Modify: `SelectInput` prop arayüzü (slot ekle)
- Test: `src/features/Input/__tests__/SelectInput.test.tsx`

**Yaklaşım:** Tetikleyici satırdaki `chevron-right`/`id-card` ikonu yerleşik `rightIcon` olur (fonksiyon: modal aç — kök Pressable'da). `leftIcon` desteği eklenir. Modal içeriği değişmez.

- [ ] **Step 1: Prop arayüzüne slot ekle** (`InputIconSlotsProps`).

- [ ] **Step 2: Tetikleyici satır**

Mevcut `<Item row alignItemsCenter>` label + icon bloğunu InputField ile sar; label `flex:1`, sağdaki chevron/id-card `rightIcon` olur:
```tsx
  const trailingIcon = readOnly
    ? {name: 'id-card' as any, height: 25, width: 25, variant: theme === 'dark' ? 'white' : 'grey-200', ...rightIcon}
    : {name: 'chevron-right' as any, height: 25, width: 25, variant: textVariant, ...rightIcon}

  // ...
  <Pressable ... onPress={handleSelectInputModal}>
    <InputField size={size} leftIcon={leftIcon} rightIcon={trailingIcon}>
      <Label
        testID='select-input-selected-item-test-id'
        style={[SelectInputStyles().pressableTextStyle, {flex: 1}]}
        numberOfLines={1}
        /* mevcut fontSize/variant/içerik — değişmez */
      >
        {/* mevcut label/placeholder içerik */}
      </Label>
    </InputField>
    {/* description bloğu — değişmez */}
  </Pressable>
```
> Chevron press'i kök Pressable (`handleSelectInputModal`) ile aynı; ikon slotu `onPress` almadığından düz `Icon` olur ve tıklama köke gider. `readOnly` iken modal zaten açılmıyor.

- [ ] **Step 3: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/SelectInput.test.tsx` → güncelle + `yarn test:u`.

- [ ] **Step 4: Commit**

```bash
git add src/features/Input/components/SelectInput 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): SelectInput chevron/id-card ikonunu rightIcon uzerinden yonet"
```

---

# Phase 4 — Tier 3 (kontrol tipleri)

## Task 15: `CheckBoxInput` — [leftIcon] [kutu] [label] [rightIcon]

**Files:**
- Modify: `src/features/Input/components/CheckBoxInput.tsx`
- Modify: `checkBoxInputProps.interface.ts` (BaseInputProps değilse slot ekle)
- Test: `src/features/Input/__tests__/CheckBoxInput.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('leftIcon ve rightIcon render eder ve tıklama kutuya sızmaz', async () => {
  const onCheckChange = jest.fn()
  const onIconPress = jest.fn()
  const {getByTestId} = await render(
    <CheckBoxInput
      name='c'
      checked={false}
      onCheckChange={onCheckChange}
      leftIcon={{name: 'lock'}}
      rightIcon={{name: 'info', onPress: onIconPress}}
    />
  )
  expect(getByTestId('checkbox-left-icon')).toBeTruthy()
  fireEvent.press(getByTestId('checkbox-right-icon'))
  expect(onIconPress).toHaveBeenCalledTimes(1)
  expect(onCheckChange).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/features/Input/__tests__/CheckBoxInput.test.tsx -t 'leftIcon ve rightIcon'`
Expected: FAIL — slot yok.

- [ ] **Step 3: Implementasyon**

checkbox kök `Pressable` içindeki `<Item row alignItemsCenter>` düzenine, kutudan önce `leftIcon`, label'dan sonra `rightIcon` slotları eklenir; slotlar `stopPropagation`'lı `Pressable`/düz `Icon`. Ortak mantık için `InputField` yerine (kök zaten Pressable ve düzen farklı) bir yardımcı IconSlot kullanımı: küçük tekrar yerine `InputField`'i `stopPropagation` ile children = kutu+label satırı olacak şekilde kullan:
```tsx
  return (
    <Pressable
      flex={0}
      testID={testID ?? 'checkbox-input-test-id'}
      onPress={() => !disabled && onCheckChange && onCheckChange(!checked)}
      {...props}>
      <InputField
        size={size}
        leftIcon={leftIcon ? {...leftIcon, testID: 'checkbox-left-icon'} as any : undefined}
        rightIcon={rightIcon ? {...rightIcon, testID: 'checkbox-right-icon'} as any : undefined}
        stopPropagation>
        <Item
          row
          alignItemsCenter
          flex={1}
          style={[StyleSheet.flatten([InputStyles({theme, size}).defaultTextInputStyle, {height: 'auto'}])]}
          testID='checkbox-container-test-id'>
          {/* mevcut kutu + description Label — değişmez */}
        </Item>
      </InputField>
    </Pressable>
  )
```
> Slot testID'leri IconSlot'un kendi testID'sini override etmez; bu yüzden test id kontrolünü `input-field-left-icon`/`input-field-right-icon` ile yapmak daha güvenli. Testi buna göre `getByTestId('input-field-right-icon')` olarak sadeleştir.

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test src/features/Input/__tests__/CheckBoxInput.test.tsx`
Expected: PASS. `yarn test:u` ile snapshot.

- [ ] **Step 5: Commit**

```bash
git add src/features/Input/components/CheckBoxInput.tsx src/features/Input/models/checkBoxInputProps.interface.ts src/features/Input/__tests__/CheckBoxInput.test.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): CheckBoxInput leftIcon/rightIcon slotlari + stopPropagation"
```

---

## Task 16: `ToggleInput` — [leftIcon] [label] … [rightIcon] [switch]

**Files:**
- Modify: `src/features/Input/components/ToggleInput.tsx`
- Modify: `toggleInputProps.interface.ts` (slot ekle)
- Test: `src/features/Input/__tests__/ToggleInput.test.tsx` (yoksa oluştur)

- [ ] **Step 1: Write the failing test**

```tsx
// gerekirse yeni dosya
import React from 'react'
import {fireEvent, render} from '../../../__tests__/utils/testUtils'
import {ToggleInput} from '../components'

it('rightIcon switch’ten önce render edilir ve onPress toggle’a sızmaz', async () => {
  const onToggle = jest.fn()
  const onIconPress = jest.fn()
  const {getByTestId} = await render(
    <ToggleInput name='t' label='Bildirim' onToggle={onToggle} rightIcon={{name: 'info', onPress: onIconPress}} />
  )
  fireEvent.press(getByTestId('input-field-right-icon'))
  expect(onIconPress).toHaveBeenCalledTimes(1)
  expect(onToggle).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Implementasyon**

Toggle satırındaki `<Item row alignItemsCenter justifyContentSpaceBetween>` içinde: `leftIcon` → label'dan önce, `rightIcon` → `Toggle` switch'inden hemen önce. Slotlar `stopPropagation`'lı. Switch ve label kendi `onPress`'lerini korur.
```tsx
      <Item row alignItemsCenter justifyContentSpaceBetween paddingHorizontal={16} paddingVertical={16}>
        {leftIcon && <IconSlotInline icon={leftIcon} side='left' size={size} />}
        {/* mevcut Label bloğu */}
        <Item row alignItemsCenter>
          {rightIcon && <IconSlotInline icon={rightIcon} side='right' size={size} />}
          <Toggle /* mevcut */ />
        </Item>
      </Item>
```
> `IconSlotInline`: InputField'deki `IconSlot` mantığının dışa aktarılmış hâli. Task 3'te `IconSlot`'u ayrı export etmek yerine, toggle için küçük bir inline slot kullanmak DRY'ı bozmasın diye: `IconSlot`'u `InputField.tsx`'ten `export` et ve burada kullan. Alternatif: toggle'ın label+switch satırını `InputField`'e children verip `stopPropagation` kullan (tercih edilen):

```tsx
      <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon} stopPropagation>
        <Item row alignItemsCenter justifyContentSpaceBetween flex={1}>
          {/* mevcut Label + Toggle */}
        </Item>
      </InputField>
```
Bu durumda rightIcon switch'in **sağında** kalır. "rightIcon switch'ten önce" gereksinimi için `IconSlot` export edip inline kullanım tercih edilir. Uygulayıcı: `IconSlot`'u export et, toggle'da inline kullan.

- [ ] **Step 3: `InputField.tsx`'te `IconSlot` export'u**

`InputField.tsx` içinde `const IconSlot` → `export const IconSlot`.

- [ ] **Step 4: Testler + snapshot**

Run: `yarn test src/features/Input/__tests__/ToggleInput.test.tsx`
Expected: PASS. `yarn test:u`.

- [ ] **Step 5: Commit**

```bash
git add src/features/Input/components/ToggleInput.tsx src/features/Input/components/InputField.tsx src/features/Input/models/toggleInputProps.interface.ts src/features/Input/__tests__/ToggleInput.test.tsx 'src/features/Input/**/__snapshots__/*'
git commit -m "feat(input): ToggleInput leftIcon/rightIcon slotlari (switch oncesi)"
```

---

# Phase 5 — Finalize

## Task 17: Tüm test paketini yeşile al + tip kontrol

**Files:** (gerektikçe test/snapshot güncellemeleri)

- [ ] **Step 1: Tüm Input testleri**

Run: `yarn test src/features/Input`
Expected: PASS. Kırılan snapshot'lar için `yarn test:u src/features/Input`.

- [ ] **Step 2: Tipkontrol + lint**

Run: `yarn typecheck && yarn lint`
Expected: 0 hata. `icon` prop'unu kullanan kalan referans olmamalı: `rg "icon=\{\{" src/features/Input` ile kontrol (yalnızca label.icon gibi meşru kullanımlar kalmalı).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(input): sol/sag ikon refactor sonrasi test ve snapshot guncellemeleri"
```

---

## Task 18: Sürüm bump + dokümantasyon (EN/TR)

**Files:**
- Modify: `package.json` (0.7.0 → 0.8.0)
- Modify/Create: docs (EN + TR), CHANGELOG/migration

- [ ] **Step 1: Sürüm**

`package.json` `"version": "0.8.0"`.

- [ ] **Step 2: Docs — bordered input + leading/trailing icon örneği**

`docs/docs/**/input*.md` (Input dokümanı) içine `leftIcon`/`rightIcon` bölümü + "spacing Input kökünde, TextInput'ta değil" notu + `icon` → `leftIcon` göç notu. Karşılık gelen TR dosyasını (`docs/i18n/tr/docusaurus-plugin-content-docs/current/**/input*.md`) senkronla (docs-translation-sync kuralı).

- [ ] **Step 3: Docs build doğrulaması**

Run: `cd docs && npm run build`
Expected: EN+TR build başarılı.

- [ ] **Step 4: Commit**

```bash
git add package.json docs
git commit -m "docs(input): leftIcon/rightIcon dokumantasyonu ve 0.8.0 surum bumpi"
```

---

## Self-Review Notları (plan yazımı sonrası)

- **Spec kapsamı:** Her Tier ve her tip bir task'a bağlandı (Tier1 → Task 6-8, Tier2 → Task 9-14, Tier3 → Task 15-16). Bug #1 → Task 5+6+ (StatementInput/DateInput `...props` temizliği), Bug #2 → Task 4 + InputField gap. ✅
- **Tip tutarlılığı:** `InputIconProps`, `InputIconSlotsProps`, `InputField`, `inputIconGapNormalizer`, `IconSlot` isimleri tüm task'larda tutarlı.
- **Açık nokta (uygulayıcı için):** IconSlot'un slot testID'si sabit (`input-field-left-icon`/`-right-icon`); tip-özel testID gerekiyorsa IconSlot'a `testID` override özelliği eklemek küçük bir genişletme olur (checkbox/phone/iban testlerinde slot testID'si kullanılması yeterli).
- **Placeholder taraması:** Kod adımları gerçek kod içeriyor; DateInput/Amount/Select gibi büyük dosyalarda "değişmez" işaretli bölümler mevcut kodun korunacağını belirtir (yeniden yazım değil, hedefli değişiklik).
