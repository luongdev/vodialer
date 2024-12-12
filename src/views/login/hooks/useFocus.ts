import { ref } from 'vue'

export function useFocus() {
  const isFocus = ref<boolean>(false)

  const handleBlur = () => {
    isFocus.value = false
  }

  const handleFocus = () => {
    isFocus.value = true
  }

  return { isFocus, handleBlur, handleFocus }
}
