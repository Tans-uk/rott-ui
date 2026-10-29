---
sidebar_position: 4
title: Common
description: Yaygın UI pattern'leri (CommonItem, CommonItemContainer)
---

# Common

Common, CommonItem ve CommonItemContainer gibi yeniden kullanılabilir UI pattern'leri sunar.

## CommonItem {#commonitem}

İkon, başlık, alt başlık ve aksiyonlar içeren çok yönlü bir liste öğesi.

### Özellikler {#features}

- 🖼️ Sol/sağ ikonlar
- 📝 Başlık, alt başlık, açıklama
- ☑️ Seçim state'leri
- ⭐ Favori desteği
- 💀 Skeleton desteği

### Temel Kullanım {#basic-usage}

```tsx
import { CommonItem } from '@tansuk/rott-ui';

<CommonItem
  title="Item Title"
  subTitle="Item subtitle"
  leftIcon="USER"
  rightIcon="CHEVRON_RIGHT"
  onPress={() => {}}
/>
```

### Seçim ile {#with-selection}

```tsx
<CommonItem
  title="Option 1"
  showSelected
  selected={selectedOption === 'option1'}
  selectedIconType="check"
  onPress={() => setSelectedOption('option1')}
/>
```

### Favori ile {#with-favorite}

```tsx
<CommonItem
  title="Favorite Item"
  favorite={isFavorite}
  onFavoritePress={() => setIsFavorite(!isFavorite)}
/>
```

## CommonItemContainer {#commonitemcontainer}

Birden çok CommonItem component'ini bir arada tutan container.

### Temel Kullanım {#basic-usage-1}

```tsx
import { CommonItemContainer } from '@tansuk/rott-ui';

<CommonItemContainer>
  <CommonItem title="Item 1" />
  <CommonItem title="Item 2" />
  <CommonItem title="Item 3" />
</CommonItemContainer>
```

## Props {#props}

### CommonItem Prop'ları {#commonitem-props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `title` | `string \| LabelProps \| ReactNode` | Öğe başlığı |
| `subTitle` | `string \| LabelProps \| ReactNode` | Alt başlık |
| `description` | `string \| LabelProps \| ReactNode` | Açıklama |
| `leftIcon` | `IconKeys \| IconProps \| ReactNode` | Sol ikon |
| `rightIcon` | `IconKeys \| IconProps \| ReactNode` | Sağ ikon |
| `showSelected` | `boolean` | Seçimi gösterir |
| `selected` | `boolean` | Seçili state'i |
| `selectedIconType` | `'check' \| 'radio'` | Seçim ikonu |
| `favorite` | `boolean` | Favori state'i |
| `onPress` | `() => void` | Basma handler'ı |

## Örnekler {#examples}

### Ayarlar Listesi {#settings-list}

```tsx
<CommonItemContainer>
  <CommonItem
    title="Account"
    subTitle="Manage your account"
    leftIcon="USER"
    rightIcon="CHEVRON_RIGHT"
    onPress={() => navigation.navigate('Account')}
  />
  <CommonItem
    title="Privacy"
    subTitle="Privacy settings"
    leftIcon="LOCK"
    rightIcon="CHEVRON_RIGHT"
    onPress={() => navigation.navigate('Privacy')}
  />
  <CommonItem
    title="Notifications"
    subTitle="Notification preferences"
    leftIcon="NOTIFICATION"
    rightIcon="CHEVRON_RIGHT"
    onPress={() => navigation.navigate('Notifications')}
  />
</CommonItemContainer>
```

### Seçim Listesi {#selection-list}

```tsx
const [selected, setSelected] = useState('option1');

<CommonItemContainer>
  {options.map((option) => (
    <CommonItem
      key={option.id}
      title={option.title}
      subTitle={option.description}
      showSelected
      selected={selected === option.id}
      selectedIconType="radio"
      onPress={() => setSelected(option.id)}
    />
  ))}
</CommonItemContainer>
```
