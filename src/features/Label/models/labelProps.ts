import type {PropsWithChildren} from 'react'

import type {TextProps} from 'react-native'

import type {FontFamily} from './fontFamily'
import type {FontWeight} from './fontWeight'

import {type CommonUiProps} from '../../../models'

export interface LabelProps extends TextProps, CommonUiProps, PropsWithChildren {
  text?: string
  textCenter?: boolean
  fontWeight?: FontWeight
  fontFamily?: FontFamily
  letterSpacing?: number
}
