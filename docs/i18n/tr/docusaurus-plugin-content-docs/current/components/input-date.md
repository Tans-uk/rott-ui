---
title: Date Input
description: Tarih ve tarih-saat picker input'u
---

# Date Input

Platformun native UI'ını kullanan tarih ve tarih-saat picker'ı.

## Özellikler {#features}

- 📅 Tarih picker'ı
- ⏰ Saat picker'ı
- 🗓️ Tarih-saat picker'ı
- 🎨 Platforma özgü native UI
- 🌍 Locale desteği

## Temel Kullanım {#basic-usage}

```tsx
import {Input} from '@tansuk/rott-ui'

<Input
  name='birthdate'
  type='date'
  mode='date'
  value={date}
  onDateChange={setDate}
/>
```

## Tarih Modları {#date-modes}

### Yalnızca Tarih {#date-only}

```tsx
<Input
  name='birthdate'
  type='date'
  mode='date'
  label='Birth Date'
  value={date}
  onDateChange={setDate}
/>
```

### Yalnızca Saat {#time-only}

```tsx
<Input
  name='appointmentTime'
  type='date'
  mode='time'
  label='Appointment Time'
  value={time}
  onDateChange={setTime}
/>
```

### Tarih ve Saat {#date-and-time}

```tsx
<Input
  name='appointment'
  type='date'
  mode='datetime'
  label='Appointment'
  value={datetime}
  onDateChange={setDatetime}
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `name` | `string` | **Zorunlu** - Input tanımlayıcısı |
| `type` | `'date'` | **Zorunlu** - 'date' olmalıdır |
| `mode` | `'date' \| 'time' \| 'datetime'` | Picker modu |
| `value` | `Date` | Mevcut tarih değeri |
| `onDateChange` | `(date: Date) => void` | Tarih değişikliği handler'ı |
| `minimumDate` | `Date` | Seçilebilecek en erken tarih |
| `maximumDate` | `Date` | Seçilebilecek en geç tarih |
| `label` | `string \| InputLabelProps` | Input label'ı |

## Min/Max Tarih ile {#with-minmax-dates}

```tsx
const today = new Date()
const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() + 1)

<Input
  name='eventDate'
  type='date'
  mode='date'
  label='Event Date'
  value={eventDate}
  onDateChange={setEventDate}
  minimumDate={today}
  maximumDate={maxDate}
/>
```

## Gösterimi Biçimlendirme {#formatting-display}

```tsx
import {format} from 'date-fns'

const [date, setDate] = useState(new Date())

<>
  <Input
    name='date'
    type='date'
    mode='date'
    value={date}
    onDateChange={setDate}
  />
  
  <Label 
    text={`Selected: ${format(date, 'MMM dd, yyyy')}`}
    marginTop={8}
  />
</>
```

## Validation Örneği {#validation-example}

```tsx
import {Formik} from 'formik'
import * as Yup from 'yup'

const DateSchema = Yup.object().shape({
  birthdate: Yup.date()
    .max(new Date(), 'Cannot be in future')
    .required('Required'),
})

<Formik
  initialValues={{birthdate: new Date()}}
  validationSchema={DateSchema}
  onSubmit={handleSubmit}>
  {({setFieldValue, values, errors, touched}) => (
    <Input
      name='birthdate'
      type='date'
      mode='date'
      label='Birth Date'
      value={values.birthdate}
      onDateChange={(date) => setFieldValue('birthdate', date)}
      errorMessage={touched.birthdate ? errors.birthdate : ''}
    />
  )}
</Formik>
```

## Yaş Kısıtlaması {#age-restriction}

```tsx
const eighteenYearsAgo = new Date()
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)

<Input
  name='birthdate'
  type='date'
  mode='date'
  label='Birth Date (18+ only)'
  maximumDate={eighteenYearsAgo}
  value={birthdate}
  onDateChange={setBirthdate}
/>
```

## İlgili Sayfalar {#related}

- **[Input](/docs/components/input)** - Ana input dokümantasyonu
- **[Expire Date Input](/docs/components/input-expire-date)** - Kart son kullanma tarihi
