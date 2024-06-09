<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  // 作为字符串，
  // 其中`%s`会被标题替换
  titleTemplate: '%s - 免费的服务器'
})
</script>