import {DeviceInfoModel} from './deviceInfoModel.interface'
import {Language} from './language.interface'

export interface RottUiContextModel {
  language: Language
  hasDynamicIsland: boolean
  hasNotch: boolean
  deviceInfo: DeviceInfoModel
}
