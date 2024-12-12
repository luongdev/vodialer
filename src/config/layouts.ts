import { getConfigLayout } from '@/utils/cache/local-storage'
import { LayoutModeEnum } from '@/constants/app-key'

export interface LayoutSettings {
  showSettings: boolean
  layoutMode: LayoutModeEnum
  showTagsView: boolean
  showLogo: boolean
  fixedHeader: boolean
  showFooter: boolean
  showNotify: boolean
  showThemeSwitch: boolean
  showScreenfull: boolean
  showSearchMenu: boolean
  cacheTagsView: boolean
  showWatermark: boolean
  showGreyMode: boolean
  showColorWeakness: boolean
}

const defaultSettings: LayoutSettings = {
  layoutMode: LayoutModeEnum.LeftTop,
  showSettings: false,
  showTagsView: false,
  fixedHeader: true,
  showFooter: false,
  showLogo: false,
  showNotify: true,
  showThemeSwitch: false,
  showScreenfull: false,
  showSearchMenu: false,
  cacheTagsView: false,
  showWatermark: false,
  showGreyMode: false,
  showColorWeakness: false
}

export const layoutSettings: LayoutSettings = { ...defaultSettings } // ...getConfigLayout() }
