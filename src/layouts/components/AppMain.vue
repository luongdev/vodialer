<script lang="ts" setup>
import { useTagsViewStore } from '@/store/modules/tags-view'
import { useSettingsStore } from '@/store/modules/settings'
import Footer from './Footer/index.vue'

const tagsViewStore = useTagsViewStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <keep-alive :include="tagsViewStore.cachedViews">
            <component :is="Component" :key="route.path" class="app-container-grow" />
          </keep-alive>
        </transition>
      </router-view>
      <!--  -->
      <Footer v-if="settingsStore.showFooter" />
    </div>
    <el-backtop />
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.app-main {
  width: 100%;
  display: flex;
}

.app-scrollbar {
  flex-grow: 1;
  overflow: auto;
  @extend %scrollbar;
  display: flex;
  flex-direction: column;
  .app-container-grow {
    flex-grow: 1;
  }
}
</style>
