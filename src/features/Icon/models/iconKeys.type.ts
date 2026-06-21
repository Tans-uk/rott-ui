import type {ConsumerIconKeys} from '../../../models'

export type IconKeys = NoInfer<import('../../../theme').TThemeIcons> | NoInfer<keyof ConsumerIconKeys>
