---
title: Date Input
description: Date and datetime picker input
---

# Date Input

Date and datetime picker with native platform UI.

## Features

- 📅 Date picker
- ⏰ Time picker
- 🗓️ DateTime picker
- 🎨 Platform-native UI
- 🌍 Locale support

## Basic Usage

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

## Date Modes

### Date Only

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

### Time Only

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

### Date and Time

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

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required** - Input identifier |
| `type` | `'date'` | **Required** - Must be 'date' |
| `mode` | `'date' \| 'time' \| 'datetime'` | Picker mode |
| `value` | `Date` | Current date value |
| `onDateChange` | `(date: Date) => void` | Date change handler |
| `minimumDate` | `Date` | Minimum selectable date |
| `maximumDate` | `Date` | Maximum selectable date |
| `label` | `string \| InputLabelProps` | Input label |

## With Min/Max Dates

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

## Formatting Display

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

## Validation Example

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

## Age Restriction

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

## Related

- **[Input](/docs/components/input)** - Main input documentation
- **[Expire Date Input](/docs/components/input-expire-date)** - Card expiry
