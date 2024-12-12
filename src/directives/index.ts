import { type App } from 'vue'
import { permission } from './permission'

export function loadDirectives(app: App) {
  app.directive('permission', permission)
}
