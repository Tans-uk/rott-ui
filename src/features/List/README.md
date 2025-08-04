## List Item

Varsayılan List Item Component tir

#### Parametreler

| Parametreler       | Type                       | Zorunluluk           | Açıklama                                                    |
| ------------------ | -------------------------- | -------------------- | ----------------------------------------------------------- |
| icon               | `IconKeys`                | :white_large_square: | Solda renderlanacak icon                                    |
| title              | `TranslationLanguageTypes` | :white_check_mark:   | Başlık                                                      |
| subTitle           | `TranslationLanguageTypes` | :white_large_square: | Alt Başlık                                                  |
| rightIcon          | `IconKeys`                | :white_large_square: | Sağda renderlanacak icon                                    |
| color              | `Variant`                  | :white_large_square: | Yazı Rengi - Varsayılan Renk: `grey-100`                    |
| fontFamily         | `FontFamily`               | :white_large_square: | Yazı Fontu - Varsayılan Font: `Markpro-Medium`              |
| onAction           | `function`                 | :white_large_square: | Item Tıklandığında Çalışacak Fonksiyon                      |
| backgroundColor    | `Variant`                  | :white_large_square: | Item Arka Plan Rengi                                        |
| swipeable          | `boolean`                  | :white_large_square: | Kaydırma Efekti                                             |
| renderRightActions | `React.ReactNode`          | :white_large_square: | Kaydırma Efektinde Sağ Tarafta Renderlanacak Item Değerleri |
| renderLeftActions  | `React.ReactNode`          | :white_large_square: | Kaydırma Efektinde Sol Tarafta Renderlanacak Item Değerleri |

#### Kullanım

```tsx
// Tanımlanma Şekli
const cardRenderItem = ({
  icon: renderIcon,
  title: renderTitle,
  rightIcon: renderRightIcon = 'ARROW_RIGHT',
  onAction: renderOnAction,
}: ListItemProps) => (
  <ListItem
    icon={renderIcon}
    title={renderTitle}
    rightIcon={renderRightIcon}
    onAction={renderOnAction}
  />
)

// Listede Kullanımı
 <List
    data={mockCardDetailActionData}
    renderItem={({item: renderItem}) => cardRenderItem(renderItem)}
    estimatedItemSize={display.heightPixel(65)}
    renderSeparator
    headerSeparator
    showsVerticalScrollIndicator={false}
    separatorVariant='grey-100'
/>
```

### Swipeable

#### Kaydırma Efekti Örneği

```tsx
// Tanımlanma Şekli
const cardRenderItem = ({
  icon: renderIcon,
  title: renderTitle,
  rightIcon: renderRightIcon = 'ARROW_RIGHT',
  onAction: renderOnAction,
}: ListItemProps) => (
  <ListItem
    icon={renderIcon}
    title={renderTitle}
    rightIcon={renderRightIcon}
    onAction={renderOnAction}
    swipeable // ZORUNLU
    renderRightActions={<Item width={display.widthPixel(50)}>
        <Pressable alignItemsCenter justifyContentCenter backgroundColor={themeConfig.colors.secondary}>
          <Icon
            name='STAR'
            width={24}
            height={24}
            marginBottom={20}
            tintColor={themeConfig.colors.black}
          />
          <Label color={themeConfig.colors.black}>{formatMessage('LIST.ITEM.FAVORITE.ADD')}</Label>
        </Pressable>
      </Item>}
  />
)

// Listede Kullanımı
 <List
    data={mockCardDetailActionData}
    renderItem={({item: renderItem}) => cardRenderItem(renderItem)}
    estimatedItemSize={display.heightPixel(65)}
    renderSeparator
    headerSeparator
    showsVerticalScrollIndicator={false}
    separatorVariant='grey-100'
/>
```

#### Favoriye Ekleme Örneği

> **Not:** Data Setinde `favorite` degeri donmek zorundadır

```tsx
// Data Seti
const [data, setData] = useState<ListItemProps[]>(mockCardDetailActionData)

// Renderlanacak Item
const cardRenderItem = (
  {
    icon: renderIcon,
    title: renderTitle,
    rightIcon: renderRightIcon = 'ARROW_RIGHT',
    favorite: renderFavorite,
    onAction: renderOnAction,
  }: ListItemProps,
  _index: number
) => (
  <CommonItem
    icon={renderIcon}
    title={renderTitle}
    rightIcon={renderRightIcon}
    onAction={renderOnAction}
    swipeable // ZORUNLU
    renderRightActions={() => (
      <FavoriteSwipeComponent
        index={_index}
        favorite={renderFavorite!}
        onAction={(itemIndex, itemFavorite) => {
          const newData = [...data]
          newData[itemIndex] = {...newData[itemIndex], favorite: itemFavorite}
          setData(newData)
        }}
      />
    )}
  />
)

// Listede Kullanımı
  <List
      data={data}
      renderItem={({item: renderItem, index: renderIndex}) =>
        cardRenderItem(renderItem, renderIndex)
      }
      estimatedItemSize={display.heightPixel(65)}
      renderSeparator
      headerSeparator
      showsVerticalScrollIndicator={false}
      separatorVariant='grey-100'
    />
```
