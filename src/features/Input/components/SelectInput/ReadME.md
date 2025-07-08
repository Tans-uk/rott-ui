## Select Input

| Params          | Type     | isRequire            | Description                                                                                                 |
| --------------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| name            | string   | :white_check_mark:   | Input name değeridir.                                                                                       |
| label           | string   | :white_check_mark:   | Başlık alanı                                                                                                |
| placeholder     | string   | :white_large_square: | Seçili değilken input içerisinde yazan değer                                                                |
| type            | string   | :white_check_mark:   | Değeri `select` olmalı                                                                                      |
| onSelectChange  | function | :white_large_square: | Değer değiştiğinde fonksiyon değeri döner. Örnek Kullanım `onSelectChange={handleChange('formik_varable')}` |
| list            | array    | :white_large_square: | Data Listesi. `SelectProps[]` formatında `label` ve `value` içeren veri listesidir                          |
| searchable      | function | :white_large_square: | Arama Özelliği Aktif-Pasif                                                                                  |
| defaultValue    | function | :white_large_square: | Varsayilan olarak secilmek istenen verinin value degeri                                                     |
| renderSeparator | boolean  | :white_large_square: | Liste ayırma çizgisi Aktif-Pasif                                                                            |
| fontSize        | Size     | :white_large_square: | Font Boyutu                                                                                                 |
| description     | string   | :white_large_square: | Select input için açıklama alanı                                                                            |

#### Data Örneği

Listede description var ise secim yapildiginda description Select Input altinda renderlanir

```tsx
const selectListExample: SelectProps[] = [
  {label: 'Apple', value: 'apple'},
  {label: 'Samsung', value: 'samsung'},
  {label: 'Huawei', value: 'huawei', description: 'Huawei Secildi Aciklamasi'},
  {label: 'Oppo', value: 'oppo'},
  {label: 'Realme', value: 'realme'},
  {label: 'LG', value: 'lg'},
  {label: 'Vestel', value: 'vestel'},
  {label: 'Motorola', value: 'motorola'},
  {label: 'Panasonic', value: 'panasonic'},
  {label: 'Ericson', value: 'ericson'},
  {label: 'Nokia', value: 'nokia'},
]
```

#### Örnek Kullanım

Input Props' ta description var ise Select Input altinda renderlanir. Listede de description var ise secim gerceklestiginde ekranda listedeki description renderlanir

```tsx
<Input
  label='Secim Yap' // **_ZORUNLU_**
  placeholder='Telefon Sec'
  type='select' // **_ZORUNLU_**
  fontSize='xl'
  name='select' // **_ZORUNLU_**
  value={select}
  onSelectChange={handleChange('select')}
  renderSeparator={false}
  errorMessage={errorSelect}
  list={selectListExample} //Liste **_ZORUNLU_**
  searchable //Arama Ozelligi Aktif-Pasif
  defaultValue='apple' //varsayilan olarak secilmek istenen verinin value degeri
  description='Select input için açıklama alanı '
/>
```
