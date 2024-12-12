<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme'
import { useGreyAndColorWeakness } from '@/hooks/useGreyAndColorWeakness'
import { ElNotification } from 'element-plus'
import enUs from 'element-plus/es/locale/lang/en'

const { initTheme } = useTheme()
const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

initTheme()

initGreyAndColorWeakness()

// ElNotification({
//   title: "Hello",
//   type: "success",
//   dangerouslyUseHTMLString: true,
//   message:
//     "Hello",
//   duration: 0,
//   position: "bottom-right"
// })
</script>

<template>
  <el-config-provider :locale="enUs">
    <router-view />
  </el-config-provider>
</template>
