import type {Variant} from '@models'

export interface ResultActionModel {
  title: string
  name?: string
  action: () => void
  variant?: Variant
  testID?: string
}
