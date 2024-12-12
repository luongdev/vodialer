<script lang="ts" setup>
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/modules/settings'
import useResize from './hooks/useResize'
import { useWatermark } from '@/hooks/useWatermark'
import { useDevice } from '@/hooks/useDevice'
import { useLayoutMode } from '@/hooks/useLayoutMode'
import LeftMode from './LeftMode.vue'
import TopMode from './TopMode.vue'
import LeftTopMode from './LeftTopMode.vue'
import { Settings, RightPanel } from './components'
import { getCssVar, setCssVar } from '@/utils/css'

useResize()

const { setWatermark, clearWatermark } = useWatermark()
const { isMobile } = useDevice()
const { isLeft, isTop, isLeftTop } = useLayoutMode()
const settingsStore = useSettingsStore()
const { showSettings, showTagsView, showWatermark } = storeToRefs(settingsStore)

const cssVarName = '--app-tagsview-height'
const v3TagsviewHeight = getCssVar(cssVarName)
watchEffect(() => {
  showTagsView.value ? setCssVar(cssVarName, v3TagsviewHeight) : setCssVar(cssVarName, '0px')
})

watchEffect(() => {
  showWatermark.value ? setWatermark(import.meta.env.VITE_APP_TITLE) : clearWatermark()
})
</script>

<template>
  <div>
    <LeftMode v-if="isLeft || isMobile" />
    <TopMode v-else-if="isTop" />
    <LeftTopMode v-else-if="isLeftTop" />
    <RightPanel v-if="showSettings">
      <Settings />
    </RightPanel>
  </div>
</template>
