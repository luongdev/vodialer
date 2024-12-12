export const getCssVar = (varName: string, element: HTMLElement = document.documentElement) => {
  if (!varName?.startsWith('--')) {
    console.warn('CSS variable names should start with --')
    return ''
  }
  return getComputedStyle(element).getPropertyValue(varName)
}

export const setCssVar = (varName: string, value: string, element: HTMLElement = document.documentElement) => {
  if (!varName?.startsWith('--')) {
    console.warn('CSS variable names should start with --')
    return
  }
  element.style.setProperty(varName, value)
}
