---
sidebar_position: 6
title: Accessibility
description: Building accessible apps with Rott UI
---

# Accessibility

Rott UI components are built with accessibility in mind, following WCAG 2.1 guidelines.

## Accessibility Features

All Rott UI components include:

- ✅ Proper accessibility roles
- ✅ Accessibility labels and hints
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Sufficient color contrast
- ✅ Minimum touch targets (44x44)

## Button Accessibility

```tsx
<Button
  variant='primary'
  accessibilityLabel='Submit form'
  accessibilityHint='Submits the registration form'
  accessibilityRole='button'
  onPress={handleSubmit}>
  Submit
</Button>
```

### Icon-Only Buttons

Always provide labels for icon-only buttons:

```tsx
<Button
  circle
  leftIcon={{name: 'CLOSE', width: 24, height: 24}}
  accessibilityLabel='Close modal'
  accessibilityRole='button'
  onPress={handleClose}
/>
```

## Input Accessibility

```tsx
<Input
  name='email'
  type='email'
  label='Email Address'
  placeholder='Enter your email'
  accessibilityLabel='Email address input field'
  accessibilityHint='Enter your email address to sign in'
/>
```

## Label Accessibility

```tsx
<Label
  text='Important Message'
  accessibilityRole='header'
  accessibilityLabel='Important notification message'
/>
```

## Interactive Elements

### Pressable

```tsx
<Pressable
  accessibilityLabel='View details'
  accessibilityRole='button'
  accessibilityHint='Opens detailed information'
  onPress={openDetails}>
  <Label text='View Details' />
</Pressable>
```

### Toggle

```tsx
<Item row alignItemsCenter>
  <Toggle
    isOn={enabled}
    onToggleChange={setEnabled}
    accessibilityLabel='Enable notifications'
    accessibilityRole='switch'
    accessibilityState={{checked: enabled}}
  />
  <Label text='Notifications' marginLeft={12} />
</Item>
```

## Color Contrast

Rott UI's default colors meet WCAG AA standards:

- Primary on white: 4.5:1 ✅
- Danger on white: 4.5:1 ✅
- Success on white: 4.5:1 ✅
- Grey-900 on white: 7:1 ✅

### Testing Contrast

Test your custom colors:

```tsx
// Good contrast
<Label text="Readable" variant="grey-900" />

// Poor contrast (avoid)
<Label text="Hard to read" variant="grey-200" />
```

## Touch Targets

Ensure minimum 44x44 touch targets:

```tsx
// Good
<Button width={44} height={44} circle>
  <Icon name="STAR" />
</Button>

// Too small (avoid)
<Pressable width={20} height={20}>
  <Icon name="STAR" />
</Pressable>
```

## Screen Reader Support

### Grouping Content

```tsx
<Item accessibilityRole='group'>
  <Label text='User Profile' accessibilityRole='header' />
  <Label text='John Doe' />
  <Label text='john@example.com' />
</Item>
```

### Live Regions

Announce dynamic content:

```tsx
<Label text={statusMessage} accessibilityLiveRegion='polite' accessibilityRole='alert' />
```

## Testing Accessibility

```tsx
import {render} from '@testing-library/react-native'

it('has proper accessibility labels', () => {
  const {getByLabelText} = render(<Button accessibilityLabel='Submit form'>Submit</Button>)

  expect(getByLabelText('Submit form')).toBeTruthy()
})

it('has proper accessibility role', () => {
  const {getByRole} = render(<Button accessibilityRole='button'>Submit</Button>)

  expect(getByRole('button')).toBeTruthy()
})
```

## Best Practices

### Do's ✅

- Provide meaningful accessibility labels
- Use semantic roles (button, header, link)
- Ensure sufficient color contrast
- Make touch targets at least 44x44
- Test with screen readers (VoiceOver/TalkBack)
- Provide hints for complex interactions

### Don'ts ❌

- Don't rely solely on color to convey information
- Don't forget labels for icon-only buttons
- Don't make touch targets too small
- Don't use vague labels like "Click here"
- Don't forget to test with assistive technologies

## Testing Tools

### iOS VoiceOver

Enable VoiceOver on iOS:
Settings → Accessibility → VoiceOver

### Android TalkBack

Enable TalkBack on Android:
Settings → Accessibility → TalkBack

## WCAG Compliance

Rott UI helps you meet WCAG 2.1 Level AA:

- ✅ Perceivable: Sufficient contrast, text alternatives
- ✅ Operable: Keyboard accessible, enough time
- ✅ Understandable: Readable, predictable
- ✅ Robust: Compatible with assistive technologies

## Related

- [Testing Guide](/docs/guides/testing)
- [Button Component](/docs/components/button)
- [Input Component](/docs/components/input)
