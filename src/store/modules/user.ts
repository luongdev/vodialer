import { ref } from 'vue'
import { pinia } from '@/store'
import { defineStore } from 'pinia'
import { useTagsViewStore } from './tags-view'
import { useSettingsStore } from './settings'
import { getToken, removeToken, setToken } from '@/utils/cache/cookies'
import { resetRouter } from '@/router'
import { loginApi, getUserInfoApi } from '@/api/login'
import { type LoginRequestData } from '@/api/login/types/login'
import routeSettings from '@/config/route'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([])
  const username = ref<string>('')

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  const login = async ({ username, password }: LoginRequestData) => {
    const { data } = await loginApi({ username, password })
    setToken(data.token)
    token.value = data.token
  }
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
  }

  const changeRoles = async (role: string) => {
    const newToken = 'token-' + role
    token.value = newToken
    setToken(newToken)
    window.location.reload()
  }

  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
    resetRouter()
    _resetTagsView()
  }

  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, username, login, getInfo, changeRoles, logout, resetToken }
})

/**
 * In SPA applications, it can be used to use the store before the pinia instance is activated
 * In SSR applications, it can be used to use the store outside of setup
 */
export function useUserStoreHook() {
  return useUserStore(pinia)
}
