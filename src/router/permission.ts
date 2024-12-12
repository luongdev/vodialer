import { router } from '@/router'
import { useUserStoreHook } from '@/store/modules/user'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { ElMessage } from 'element-plus'
import { setRouteChange } from '@/hooks/useRouteListener'
import { useTitle } from '@/hooks/useTitle'
import { getToken } from '@/utils/cache/cookies'
import routeSettings from '@/config/route'
import isWhiteList from '@/config/white-list'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const { setTitle } = useTitle()
const userStore = useUserStoreHook()
const permissionStore = usePermissionStoreHook()

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  if (!getToken()) {
    if (isWhiteList(to)) return next()
    return next('/login')
  }

  if (to.path === '/login') {
    return next({ path: '/' })
  }

  if (userStore.roles.length !== 0) return next()

  try {
    await userStore.getInfo()
    //  ["admin"] ["developer", "editor"]
    const roles = userStore.roles
    routeSettings.dynamic ? permissionStore.setRoutes(roles) : permissionStore.setAllRoutes()
    permissionStore.addRoutes.forEach((route) => router.addRoute(route))
    // replace: true, Therefore, the navigation will not leave a history record.
    next({ ...to, replace: true })
  } catch (error) {
    userStore.resetToken()
    ElMessage.error((error as Error).message || 'An error occurred during the routing guard process')
    next('/login')
  }
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
