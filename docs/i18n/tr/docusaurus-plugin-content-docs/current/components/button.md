---
sidebar_position: 1
title: Button
description: Variant, boyut, ikon ve yükleme state'leri destekleyen etkileşimli buton component'i
---

# Button

Button component'i; birden çok variant'ı, boyutu, ikonu, görseli ve yükleme state'lerini destekleyen, çok yönlü ve etkileşimli bir öğedir.

## Özellikler {#features}

- 🎨 Birden çok renk variant'ı
- 📏 Esnek boyutlandırma
- 🖼️ Sol/sağ ikonlar ve görseller
- ⏳ Yükleme state'leri
- 🔘 Yuvarlak buton variant'ı
- 🎯 Outline variant'lar
- ♿ Erişilebilirlik desteği

## Temel Kullanım {#basic-usage}

```tsx
import { Button } from '@tansuk/rott-ui';

<Button variant="primary" onPress={() => console.log('Pressed!')}>
  Click Me
</Button>
```

## Variant'lar {#variants}

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="primary-outline">Primary Outline</Button>
```

### Özel Border'lar {#custom-borders}

`borderWidth` ve `borderColor` yalnızca `*-outline` variant'larında değil, tüm variant'larda dikkate alınır.
Açıkça verilen değerler her zaman önceliklidir; ikisini de vermediğinizde fallback olarak `*-outline` border'ı kullanılır.

Bu, dolgu rengi bir marka kılavuzuyla sabitlenmiş kontroller için önemlidir: bu durumda kontrolü sayfadan
ayıran tek şey border'dır ve WCAG 2.1 SC 1.4.11 bu sınırda en az 3:1 kontrast ister.

```tsx
<Button backgroundColor="#FFFFFF" color="#1F1F1F" borderWidth={1} borderColor="#747775">
  Sign in with Google
</Button>
```

## Boyutlar {#sizes}

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="xxl">Extra Extra Large</Button>
<Button size="full">Full Width</Button>
```

| Boyut | Genişlik | Yükseklik |
|------|-------|--------|
| `xs` | 85.5 | 36 |
| `sm` | 114 | 40 |
| `md` | 171 | 48 |
| `lg` | 228 | 56 |
| `xl` | Parent'ın %85'i | 64 |
| `xxl` | Parent'ın %92.5'i | 72 |
| `full` | Parent'ın %100'ü | 56 |

`xs`'ten `lg`'ye kadar olan boyutlar sabit genişliklerdir; 390pt'lik bir referans cihaza göre tanımlanır ve
gerçek ekran genişliğine göre ölçeklenir. `xl`, `xxl` ve `full` ise **parent container'a görelidir**; bu yüzden
padding'li bir kartın içindeki `size="full"` buton, kartın dışına taşmak yerine kartın content box'ını doldurur.

`size`, genişlik ve yüksekliği birbirinden bağımsız seçebilmeniz için bir object de kabul eder:

```tsx
<Button size={{ width: 'md', height: 'lg' }}>Medium wide, large tall</Button>
```

`size` verilmediğinde buton default olarak `{ height: 'lg' }` kullanır: tam genişlik, 56 yükseklik.

## İkonlarla {#with-icons}

```tsx
<Button 
  variant="primary"
  leftIcon={{ name: 'PLUS', width: 20, height: 20 }}
>
  Add Item
</Button>

<Button 
  variant="primary"
  rightIcon={{ name: 'ARROW_RIGHT', width: 20, height: 20 }}
>
  Continue
</Button>
```

## Yükleme State'leri {#loading-states}

```tsx
<Button
  variant="primary"
  isLoading={true}
  loadingText="Processing..."
  onPress={handleSubmit}
>
  Submit
</Button>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `variant` | `Variant` | `'primary'` | Renk variant'ı |
| `size` | `Size \| { width, height }` | `{ height: 'lg' }` | Buton boyutu |
| `borderWidth` | `number` | `*-outline` için `2`, diğerlerinde yok | Border genişliği; tüm variant'larda dikkate alınır |
| `borderColor` | `string` | `*-outline` için variant rengi, diğerlerinde yok | Border rengi; tüm variant'larda dikkate alınır |
| `isLoading` | `boolean` | `false` | Yükleme state'i |
| `loadingText` | `string` | - | Yükleme metni |
| `disabled` | `boolean` | `false` | Devre dışı state'i |
| `circle` | `boolean` | `false` | Yuvarlak buton |
| `leftIcon` | `ButtonIconProps` | - | Sol ikon |
| `rightIcon` | `ButtonIconProps` | - | Sağ ikon |
| `leftImage` | `ButtonImageProps` | - | Sol görsel |
| `rightImage` | `ButtonImageProps` | - | Sağ görsel |
| `onPress` | `() => void` | - | Basma handler'ı |

## Örnekler {#examples}

### Giriş Butonu {#login-button}

```tsx
<Button
  size="full"
  variant="primary"
  fontSize="lg"
  leftIcon={{ name: 'USER', width: 20, height: 20 }}
  onPress={handleLogin}
>
  Sign In
</Button>
```

### Onaylı Silme {#delete-with-confirmation}

```tsx
<Button
  variant="danger"
  leftIcon={{ name: 'REMOVE', width: 20, height: 20 }}
  onPress={() => {
    AlertDialog.show({
      title: 'Confirm Delete',
      text: 'Are you sure?',
      buttons: [
        { text: 'Cancel', variant: 'secondary' },
        { text: 'Delete', variant: 'danger', onPress: handleDelete },
      ],
    });
  }}
>
  Delete
</Button>
```
