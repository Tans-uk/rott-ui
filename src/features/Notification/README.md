# Notification

Toast notifications. `RottProvider` sets them up; call the static methods anywhere once it
has rendered. The toasts are rendered with
[react-native-toast-notifications](https://github.com/arnnis/react-native-toast-notifications),
a peer dependency that your app installs.

| Method    | Parameters                                                    | Description                                                                 |
| --------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `success` | `(title: string, description?: string, onPress?: () => void)` | Show a success toast                                                        |
| `warning` | `(title: string, description?: string, onPress?: () => void)` | Show a warning toast                                                        |
| `danger`  | `(title: string, description?: string, onPress?: () => void)` | Show an error toast                                                         |
| `info`    | `(title: string, description?: string, onPress?: () => void)` | Show an info toast                                                          |
| `show`    | `({title, description?, variant, onPress?})`                  | Show a toast; `variant` is `'success'`, `'warning'`, `'danger'` or `'info'` |
| `hide`    | `(id: string)`                                                | Hide one toast; the methods above return its id                             |
| `hideAll` | `()`                                                          | Hide every visible toast                                                    |

#### Usage

```tsx
import {Notification} from '@tansuk/rott-ui'

Notification.success('Saved', 'Your changes were stored')
Notification.info('New message', 'Open your inbox', () => navigation.navigate('Inbox'))
```

The app stays interactive while a toast is visible. To ignore touches until the last toast
closes, pass `blockTouchesWhileNotificationVisible` to `RottProvider`. See the Notification
page of the documentation for details.
