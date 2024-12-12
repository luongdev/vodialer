<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { AppMain, NavigationBar, Sidebar, TagsView, Logo } from './components'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { showTagsView, showLogo } = storeToRefs(settingsStore)

const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened
  }
})
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <div class="fixed-header layout-header">
      <Logo v-if="showLogo" :collapse="false" class="logo" />
      <div class="content">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
    </div>
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <Sidebar class="sidebar-container" />
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
  display: flex;
  .logo {
    flex: none;
    width: var(--app-sidebar-width);
  }
  .content {
    flex: 1;
    overflow: hidden;
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

.sidebar-container {
  background-color: var(--el-menu-bg-color);
  transition: width $transition-time;
  width: var(--app-sidebar-width) !important;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--app-sidebar-border-right);
  padding-top: var(--app-navigationbar-height);
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--app-navigationbar-height);
  padding-left: var(--app-sidebar-width);
  height: 100vh;
  overflow: auto;
}

.hideSidebar {
  .sidebar-container {
    width: var(--app-sidebar-hide-width) !important;
  }
  .app-main {
    padding-left: var(--app-sidebar-hide-width);
  }
}

.hasTagsView {
  .sidebar-container {
    padding-top: var(--app-header-height);
  }
  .app-main {
    padding-top: var(--app-header-height);
  }
}
</style>
