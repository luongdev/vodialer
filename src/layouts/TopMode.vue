<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/modules/settings'
import { AppMain, NavigationBar, TagsView, Logo } from './components'

const settingsStore = useSettingsStore()
const { showTagsView, showLogo } = storeToRefs(settingsStore)
</script>

<template>
  <div class="app-wrapper">
    <div class="fixed-header layout-header">
      <div class="content">
        <Logo v-if="showLogo" :collapse="false" class="logo" />
        <NavigationBar class="navigation-bar" />
      </div>
      <TagsView v-show="showTagsView" />
    </div>
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  .logo {
    width: var(--app-sidebar-width);
  }
  .content {
    display: flex;
    .navigation-bar {
      flex: 1;
    }
  }
}

.layout-header {
  background-color: var(--app-header-bg-color);
  box-shadow: var(--app-header-box-shadow);
  border-bottom: var(--app-header-border-bottom);
}

.main-container {
  min-height: 100%;
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--app-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    padding-top: var(--app-header-height);
  }
}
</style>
