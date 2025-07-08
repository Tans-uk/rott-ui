import type {Variant} from '@models'

export interface NotificationModel {
  title: string
  description?: string
  variant: Variant
}
