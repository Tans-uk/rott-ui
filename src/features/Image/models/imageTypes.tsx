import type {ConsumerImageKeys} from '../../../models'

export type ImageTypes = NoInfer<import('../../../theme').TThemeImages> | NoInfer<keyof ConsumerImageKeys>
