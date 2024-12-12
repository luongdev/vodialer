<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

interface Props {
  element?: string
  openTips?: string
  exitTips?: string
  content?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  element: 'html',
  openTips: 'Full screen',
  exitTips: 'Exit Full screen',
  content: false
})

const CONTENT_LARGE = 'content-large'
const CONTENT_FULL = 'content-full'
const classList = document.body.classList

//#region Full screen
const isEnabled = screenfull.isEnabled
const isFullscreen = ref<boolean>(false)
const fullscreenTips = computed(() => (isFullscreen.value ? props.exitTips : props.openTips))
const fullscreenSvgName = computed(() => (isFullscreen.value ? 'fullscreen-exit' : 'fullscreen'))

const handleFullscreenClick = () => {
  const dom = document.querySelector(props.element) || undefined
  isEnabled ? screenfull.toggle(dom) : ElMessage.warning('Your browser is not working')
}
const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
  isFullscreen.value || classList.remove(CONTENT_LARGE, CONTENT_FULL)
}
watchEffect((onCleanup) => {
  if (isEnabled) {
    screenfull.on('change', handleFullscreenChange)
    onCleanup(() => screenfull.off('change', handleFullscreenChange))
  }
})
//#endregion

//#region Content Area
const isContentLarge = ref<boolean>(false)
const contentLargeTips = computed(() => (isContentLarge.value ? 'Content Arearecovery' : 'Content Areaenlarge'))
const contentLargeSvgName = computed(() => (isContentLarge.value ? 'fullscreen-exit' : 'fullscreen'))
const handleContentLargeClick = () => {
  isContentLarge.value = !isContentLarge.value
  classList.toggle(CONTENT_LARGE, isContentLarge.value)
}
const handleContentFullClick = () => {
  isContentLarge.value && handleContentLargeClick()
  classList.add(CONTENT_FULL)
  handleFullscreenClick()
}
//#endregion
</script>

<template>
  <div>
    <!-- Full screen -->
    <el-tooltip v-if="!content" effect="dark" :content="fullscreenTips" placement="bottom">
      <SvgIcon :name="fullscreenSvgName" @click="handleFullscreenClick" />
    </el-tooltip>
    <!-- Content Area -->
    <el-dropdown v-else :disabled="isFullscreen">
      <SvgIcon :name="contentLargeSvgName" />
      <template #dropdown>
        <el-dropdown-menu>
          <!-- Content Areaenlarge -->
          <el-dropdown-item @click="handleContentLargeClick">{{ contentLargeTips }}</el-dropdown-item>
          <!-- Content AreaFull screen -->
          <el-dropdown-item @click="handleContentFullClick">Content AreaFull screen</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
