## Skeleton

Veri yüklenirken verinin yükleneceği tasarımın bir benzerini ekranda bulundurmak için kullanılır.
Sayfadaki sıçrama problemleri giderir.

| Parametreler | Type      | Zorunluluk           | Varsayılan Değer | Açıklama                                                            |
| ------------ | --------- | -------------------- | ---------------- | ------------------------------------------------------------------- |
| show         | `boolean` | :white_large_square: | `false`          | Gösterilip gösterilmeyeceği belirlenir                              |
| width        | `number`  | :white_check_mark:   |                  | Taklit Edilen Item Genişliği                                        |
| height       | `number`  | :white_check_mark:   |                  | Taklit Edilen Item Yüksekliği                                       |
| radius       | `number`  | :white_large_square: | `4px`            | Taklit Edilen Item Radius'u                                         |
| noAnimation  | `boolean` | :white_large_square: | `false`          | Deger `true` ise skeleton gorunurken animation ozelligi kapali olur |

### Örnek - 1

Taklit edilecek Item için 2 props girilerek Skeleton kullanılabilir.
Bu sayede Item a ait tum style kosullarından etkilenmiş olur.
`skeletonShow`: Ekranda renderlanma durumu `boolean`
`skeletonStyle`: Skeleton style

```tsx
<Item
  marginTop={8}
  row
  skeletonShow={!id} //id değeri boş ise skeleton ekranda renderlanır
  skeletonStyle={{
    // Taklit edilen alanın genişlik ve yüksekliği
    width: 80,
    height: 16,
  }}>
  ...
</Item>
```

### Örnek - 2

```tsx
<Skeleton show={!id} width={80} height={16} />
```

### Örnek - 3

Skeleton Gorunurken Animasyon Calismasi istenmiyorsa bu sekilde kullanilabilir

```tsx
<Skeleton show={!id} width={80} height={16} noAnimation />
```
