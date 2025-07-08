## Result - İşlem Sonucu Modalı

| Params      | Type                        | isRequire            | Description                                                                                     |
| ----------- | --------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| variant     | `string` -> `ResultVariant` | :white_check_mark:   | `success` `error` `warning` `info` degerlerinden birini almalidir                               |
| iconName    | `string` -> `IconTypes`     | :white_check_mark:   | Sonuç ekranında gösterilecek olan Icon ismi. `RESULT_NAME` seklinde adlandırmak uygun olacaktır |
| actions     | `ResultActionsProps[]`      | :white_large_square: | Sonuç ekranında çıkacak buton listesi                                                           |
| onClose     | `function`                  | :white_large_square: | Modal Kapatılırken Yapılacak İşlemler                                                           |
| title       | `string` or `JSX.Element`   | :white_large_square: | Icon altında bulunan başlık gölümü                                                              |
| description | `string` or `JSX.Element`   | :white_large_square: | Action butonlarının üstünde bulunan açıklama bölümü                                             |
| headerTitle | `string`                    | :white_large_square: | Header Başlığı                                                                                  |
| headerLogo  | `string`                    | :white_large_square: | Header Başlığında yer alacak Logo Name                                                          |
| header      | `string`                    | :white_large_square: | Custom Header Content i                                                                         |

#### State Örneği

```tsx
const [showResultModal, setShowResultModal] = useState<boolean>(false)
```

#### Action List Örneği

```tsx
const resultData: ResultActionsProps[] = [
  {
    name: 'dekont-gonder',
    title: 'Dekont Gonder',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Dekont Gonder')
    },
  },
  {
    name: 'yeni-islem',
    title: 'Yeni Islem',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Yeni Islem')
    },
  },
]
```

#### Örnek Kullanım

```tsx
<Result
  headerTitle='Islem Basarili'
  iconName='RESULT_OK'
  variant='success'
  actions={resultData}
  isShow={showResultModal}
  title='Baslik bu alana Yazilir'
  description='Aciklama Bu Alana Yazilir'
  onClose={() => setShowResultModal(false)}
/>
```

#### Title ve Descripton Content Alabilir. Örnek Kullanım:

```tsx
<Result
  headerTitle='Islem Basarili'
  iconName='RESULT_OK'
  variant='success'
  actions={resultData}
  isShow={showResultModal}
  title={
    <Item alignItemsCenter>
      <Item row>
        <Icon name='HGS_LOGO_WHITE' width={100} height={70} marginRight={20} />
        <Label fontSize='xl' variant='white' paddingTop={30}>
          Bakiye Yukleme
        </Label>
      </Item>
      <Item>
        <Label fontSize='xl' variant='white'>
          Islem Basariyla Tamamlandi
        </Label>
      </Item>
    </Item>
  }
  description={
    <Item alignItemsCenter>
      <Label variant='white' fontSize='xl'>
        <Label fontWeight='bold' fontSize='xl'>
          06 JN 4511
        </Label>{' '}
        plakali arac icin
      </Label>
      <Label variant='white' fontSize='xl'>
        <Label fontWeight='bold' fontSize='xl'>
          25.00 TL
        </Label>{' '}
        HGS bakiyesi tanimlandi
      </Label>
    </Item>
  }
  onClose={() => setShowResultModal(false)}
/>
```

#### Icon Name Tercihleri

| Icon Name     | Açıklama                          |
| ------------- | --------------------------------- |
| `RESULT_OK`   | Başarılı işlemlerde kullanılır    |
| `RESULT_HGS`  | HGS işlemleri için kullanılır     |
| `RESULT_DATE` | Randevu işlemleri için kullanılır |

# Result Screen

### ResultScreenParamModel

| Params      | Type                               | isRequire            | Description                                         |
| ----------- | ---------------------------------- | -------------------- | --------------------------------------------------- |
| headerTitle | `string`                           | :white_large_square: | Header Başlığı                                      |
| title       | `string`                           | :white_large_square: | Icon altında bulunan başlık gölümü                  |
| description | `string`                           | :white_large_square: | Action butonlarının üstünde bulunan açıklama bölümü |
| status      | `success` `error` `warning` `info` | :white_large_square: | Action butonlarının üstünde bulunan açıklama bölümü |
| actions     | `ResultActionsProps[]`             | :white_large_square: | Sonuç ekranında çıkacak buton listesi               |

## Result Screen Redirect Ornek

```ts
addMatcherWait(
  () =>
    redirect<ResultScreenParamModel>('ResultScreen', {
      headerTitle: formatMessage('TRANSACTION.RESULT.SUCCESS.TITLE'),
      description: formatMessage('TRANSACTION.RESULT.SUCCESS.DESCRIPTION.MOBILE.TRANSFER', {
        phone: phoneNumber,
      }),
      status: 'success',
      actions: [
        {
          title: formatMessage('TRANSACTION.RESULT.ACTION.MAIN.SCREEN'),
          variant: 'white-outline',
          action: () => {
            console.warn('go home')
          },
        },
        {
          title: formatMessage('TRANSACTION.RESULT.ACTION.RETRANSFER'),
          variant: 'white-outline',
          action: () => {
            routeGoBack(4)
          },
        },
        {
          title: formatMessage('TRANSACTION.RESULT.ACTION.RECEIPT.VIEW.OR.SHARE'),
          action: () => {
            console.warn('dekont goruntule')
          },
        },
      ] as ResultActionModel[],
    })

  // TODO: state reset edilmeli
)
```
