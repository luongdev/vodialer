import { type RouteLocationNormalized, type RouteRecordNameGeneric } from 'vue-router'

const whiteListByPath: string[] = ['/login']

const whiteListByName: RouteRecordNameGeneric[] = []

const isWhiteList = (to: RouteLocationNormalized) => {
  return whiteListByPath.indexOf(to.path) !== -1 || whiteListByName.indexOf(to.name) !== -1
}

export default isWhiteList
