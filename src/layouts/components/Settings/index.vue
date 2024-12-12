<script lang="ts" setup>
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/modules/settings'
import { useLayoutMode } from '@/hooks/useLayoutMode'
import { removeConfigLayout } from '@/utils/cache/local-storage'
import SelectLayoutMode from './SelectLayoutMode.vue'
import { Refresh } from '@element-plus/icons-vue'

const { isLeft } = useLayoutMode()
const settingsStore = useSettingsStore()

const {
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

const switchSettings = {
  'Show tags view': showTagsView,
  'Show Logo': showLogo,
  'Fixed Header': fixedHeader,
  'Show Footer': showFooter,
  'Show Notify': showNotify,
  showThemeSwitch: showThemeSwitch,
  showScreenfull: showScreenfull,
  showSearchMenu: showSearchMenu,
  cacheTagsView: cacheTagsView,
  showWatermark: showWatermark,
  showGreyMode: showGreyMode,
  showColorWeakness: showColorWeakness
}

watchEffect(() => {
  !isLeft.value && (fixedHeader.value = true)
})

const resetConfigLayout = () => {
  removeConfigLayout()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4>Layout Configuration</h4>
    <SelectLayoutMode />
    <el-divider />
    <h4>Function Configuration</h4>
    <div class="setting-item" v-for="(settingValue, settingName, index) in switchSettings" :key="index">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" :disabled="!isLeft && settingName === 'Fixed Header'" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetConfigLayout">Reset</el-button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @extend %ellipsis;
    }
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
