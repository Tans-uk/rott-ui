import type {ActionModel} from './actionModel'

export interface ActionMenuProps {
  title?: Nullable<string>
  subTitle?: Nullable<string>
  data?: ActionModel[]
  testID?: string
  visible?: boolean
  maxVisibleItemCount?: number
  itemHeight?: number
  maxItem?: number
  separatorTotalHeight?: number
}
