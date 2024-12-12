interface RouteSettings {
  dynamic: boolean

  defaultRoles: Array<string>

  thirdLevelRouteCache: boolean
}

const routeSettings: RouteSettings = {
  dynamic: true,
  defaultRoles: ['DEFAULT_ROLE'],
  thirdLevelRouteCache: false
}

export default routeSettings
