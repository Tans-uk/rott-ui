import {DeviceInfoModel} from './deviceInfoModel.interface'
import {Language} from './language.interface'
import {ThemeConfig} from './themeConfig.interface'

export interface RottUiContextModel extends ThemeConfig {
  language: Language
  deviceInfo: DeviceInfoModel
}
