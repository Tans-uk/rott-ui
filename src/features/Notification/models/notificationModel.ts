import {Variant} from '../../../models'

export interface NotificationModel {
  title: string
  description?: string
  variant: Variant
  /** Runs when the user taps the notification, which then closes. */
  onPress?: () => void
}
