<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { type RouteRecordName, type RouteRecordRaw } from 'vue-router'

interface Props {
  list: RouteRecordRaw[]
  isPressUpOrDown: boolean
}

const modelValue = defineModel<RouteRecordName | undefined>({ required: true })
const props = defineProps<Props>()

const instance = getCurrentInstance()
const scrollbarHeight = ref<number>(0)

const itemStyle = (item: RouteRecordRaw) => {
  const flag = item.name === modelValue.value
  return {
    background: flag ? 'var(--el-color-primary)' : '',
    color: flag ? '#ffffff' : ''
  }
}

const handleMouseenter = (item: RouteRecordRaw) => {
  if (props.isPressUpOrDown) return
  modelValue.value = item.name
}

const getScrollbarHeight = () => {
  // el-scrollbar max-height="40vh"
  scrollbarHeight.value = Number((window.innerHeight * 0.4).toFixed(1))
}

const getScrollTop = (index: number) => {
  const currentInstance = instance?.proxy?.$refs[`resultItemRef${index}`] as HTMLDivElement[]
  if (!currentInstance) return 0
  const currentRef = currentInstance[0]
  const scrollTop = currentRef.offsetTop + 128
  return scrollTop > scrollbarHeight.value ? scrollTop - scrollbarHeight.value : 0
}

onBeforeMount(() => {
  window.addEventListener('resize', getScrollbarHeight)
})

onMounted(() => {
  getScrollbarHeight()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', getScrollbarHeight)
})

defineExpose({ getScrollTop })
</script>

<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      :ref="`resultItemRef${index}`"
      class="result-item"
      :style="itemStyle(item)"
      @mouseenter="handleMouseenter(item)"
    >
      <SvgIcon v-if="item.meta?.svgIcon" :name="item.meta.svgIcon" />
      <component v-else-if="item.meta?.elIcon" :is="item.meta.elIcon" class="el-icon" />
      <span class="result-item-title">
        {{ item.meta?.title }}
      </span>
      <SvgIcon v-if="modelValue && modelValue === item.name" name="keyboard-enter" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.result-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 15px;
  margin-bottom: 8px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  .svg-icon {
    min-width: 1em;
    font-size: 18px;
  }
  .el-icon {
    width: 1em;
    font-size: 18px;
  }
  &-title {
    flex: 1;
    margin-left: 12px;
    @extend %ellipsis;
  }
}
</style>
