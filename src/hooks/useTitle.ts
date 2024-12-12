import { ref, watch } from 'vue'

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE ?? 'VoDialer'

const dynamicTitle = ref<string>('')

const setTitle = (title?: string) => {
  dynamicTitle.value = title ? `${VITE_APP_TITLE} | ${title}` : VITE_APP_TITLE
}

watch(dynamicTitle, (value, oldValue) => {
  if (document && value !== oldValue) {
    document.title = value
  }
})

export function useTitle() {
  return { setTitle }
}
