// core
import App from '@/App.vue'
import { createApp } from 'vue'
import { pinia } from '@/store'
import { router } from '@/router'
import '@/router/permission'
// load
import { loadSvg } from '@/icons'
import { loadPlugins } from '@/plugins'
import { loadDirectives } from '@/directives'
// css
import 'uno.css'
import 'normalize.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
import '@/styles/index.scss'

const app = createApp(App)

loadPlugins(app)

loadSvg(app)

loadDirectives(app)

app.use(pinia).use(router)
router.isReady().then(() => {
  app.mount('#app')
})
