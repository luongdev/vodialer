<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const isAdmin = userStore.roles.includes('admin')
</script>

<template>
  <h1>Dashboard view {{ `${isAdmin}` }}</h1>
</template>
