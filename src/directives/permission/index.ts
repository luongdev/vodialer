import { type Directive } from 'vue'
import { useUserStore } from '@/store/modules/user'

export const permission: Directive = {
  mounted(el, binding) {
    const { value: permissionRoles } = binding
    const { roles } = useUserStore()
    if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
      const hasPermission = roles.some((role) => permissionRoles.includes(role))
      // hasPermission || (el.style.display = "none") //
      hasPermission || el.parentNode?.removeChild(el) //
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
