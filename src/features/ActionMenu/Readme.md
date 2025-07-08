## Action Menu

| Params   | Type                  | Description                                                                                                                    |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| title    | string                | Başlık alanı                                                                                                                   |
| subTitle | string                | Alt başlık alanı                                                                                                               |
| data     | ActionMenuDataProps[] | veri listesi                                                                                                                   |
| visible  | boolean               | ActionMenu komponentin bulunduğu yerdeki Show state i                                                                          |
| onClose  | function              | Modal kapatıldığında tetiklenen fonksiyondur. Komponentin kullanıldığu yerdeki state ini bu fonksiyon ile güncelleyebilirsiniz |
| maxItem  | number                | Ekranda gorunmesi istenen item sayisi                                                                                          |

#### State Örneği

```tsx
const [showActionMenu, setShowActionMenu] = useState<boolean>(false)
```

#### Data Örneği

```tsx
const actionMenuData: ActionMenuDataProps[] = [
  {
    name: 'para-gonder',
    title: 'Para Gonder',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Para Gonder')
    },
  },
  {
    name: 'hesap-hareketleri-incele',
    title: 'Hesap Hareketleri Incele',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Hesap Hareketleri Incele')
    },
  },
  {
    name: 'fatura-ode',
    title: 'Fatura Öde',
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Fatura Öde')
    },
  },
]
```

#### Örnek Kullanım - 1

```tsx
// Action Menu Kullanımı. Ekranda Herhangi Bir Yere Yerleştirilebilir.
<ActionMenu
  title='Test Title'
  subTitle='Test Sub Title'
  data={actionMenuData}
  visible={showActionMenu}
  onClose={() => setShowActionMenu(false)}
/>
```

#### Örnek Kullanım - 2

```ts
ActionMenu.showActionMenu({
  title: formatMessage('DASHBOARD.CARD.SEND'),
  subTitle: formatMessage('DASHBOARD.CARD.SEND'),
  maxItem: 7,
  data: [
    {
      title: formatMessage('DASHBOARD.BUTTON.MONEY.TRANSFER.TO.PTT.ACCOUNT'),
      name: 'DASHBOARD.BUTTON.MONEY.TRANSFER.TO.PTT.ACCOUNT'.toSeoFriendly(),
      action: () => {
        redirect('PTTAccountTransferScreen')
      },
    },
    {
      title: formatMessage('DASHBOARD.BUTTON.MONEY.TRANSFER.TO.MOBILE'),
      name: 'DASHBOARD.BUTTON.MONEY.TRANSFER.TO.PTT.ACCOUNT'.toSeoFriendly(),
      action: () => {
        redirect('MobileTransferScreen')
      },
    },
  ],
})
```
