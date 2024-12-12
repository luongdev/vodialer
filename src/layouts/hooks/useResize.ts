import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useRouteListener } from '@/hooks/useRouteListener'
import { DeviceEnum } from '@/constants/app-key'

const MAX_MOBILE_WIDTH = 992

export default () => {
  const appStore = useAppStore()
  const { listenerRouteChange } = useRouteListener()

  const _isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < MAX_MOBILE_WIDTH
  }

  const _resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = _isMobile()
      appStore.toggleDevice(isMobile ? DeviceEnum.Mobile : DeviceEnum.Desktop)
      isMobile && appStore.closeSidebar(true)
    }
  }
  listenerRouteChange(() => {
    if (appStore.device === DeviceEnum.Mobile && appStore.sidebar.opened) {
      appStore.closeSidebar(false)
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', _resizeHandler)
  })

  onMounted(() => {
    if (_isMobile()) {
      appStore.toggleDevice(DeviceEnum.Mobile)
      appStore.closeSidebar(true)
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', _resizeHandler)
  })
}
