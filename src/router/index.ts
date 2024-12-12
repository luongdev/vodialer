import { type RouteRecordRaw, createRouter } from 'vue-router'
import { history, flatMultiLevelRoutes } from './helper'
import routeSettings from '@/config/route'

const Layouts = () => import('@/layouts/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ':path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true
    },
    alias: '/:pathMatch(.*)*'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          svgIcon: 'dashboard',
          affix: true
          // roles: ["admin", "editor"],
          // alwaysShow: true //
        }
      },
      {
        path: 'dashboard2',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard2',
        meta: {
          title: 'dashboard2',
          svgIcon: 'dashboard',
          affix: false
          // roles: ["admin", "editor"],
          // alwaysShow: true //
        }
      }
    ]
  }
]

export const dynamicRoutes: RouteRecordRaw[] = []

export const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

export function resetRouter() {
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    window.location.reload()
  }
}
