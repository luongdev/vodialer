import { ref, watchEffect } from 'vue'
import { getActiveThemeName, setActiveThemeName } from '@/utils/cache/local-storage'

const DEFAULT_THEME_NAME = 'normal'
type DefaultThemeName = typeof DEFAULT_THEME_NAME

export type ThemeName = DefaultThemeName | 'dark' | 'dark-blue'

interface ThemeList {
  title: string
  name: ThemeName
}

const themeList: ThemeList[] = [
  {
    title: 'default',
    name: DEFAULT_THEME_NAME
  },
  {
    title: 'dark',
    name: 'dark'
  },
  {
    title: 'dark-blue',
    name: 'dark-blue'
  }
]

const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

const addHtmlClass = (value: ThemeName) => {
  document.documentElement.classList.add(value)
}

const removeHtmlClass = (value: ThemeName) => {
  const otherThemeNameList = themeList.map((item) => item.name).filter((name) => name !== value)
  document.documentElement.classList.remove(...otherThemeNameList)
}

const initTheme = () => {
  watchEffect(() => {
    const value = activeThemeName.value
    removeHtmlClass(value)
    addHtmlClass(value)
    setActiveThemeName(value)
  })
}

export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
