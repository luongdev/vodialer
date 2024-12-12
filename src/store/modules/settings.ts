import { type Ref, ref, watch } from 'vue'
import { pinia } from '@/store'
import { defineStore } from 'pinia'
import { type LayoutSettings, layoutSettings } from '@/config/layouts'
import { setConfigLayout } from '@/utils/cache/local-storage'

type SettingsStore = {
  [Key in keyof LayoutSettings]: Ref<LayoutSettings[Key]>
}

type SettingsStoreKey = keyof SettingsStore

export const useSettingsStore = defineStore('settings', () => {
  const state = {} as SettingsStore
  for (const [key, value] of Object.entries(layoutSettings)) {
    const refValue = ref(value)
    // @ts-ignore
    state[key as SettingsStoreKey] = refValue
    watch(refValue, () => {
      const settings = _getCacheData()
      setConfigLayout(settings)
    })
  }
  const _getCacheData = () => {
    const settings = {} as LayoutSettings
    for (const [key, value] of Object.entries(state)) {
      // @ts-ignore
      settings[key as SettingsStoreKey] = value.value
    }
    return settings
  }

  return state
})

export function useSettingsStoreHook() {
  return useSettingsStore(pinia)
}
