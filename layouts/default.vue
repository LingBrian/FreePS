<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <DefaultHeader/>
      </el-header>
      
      <el-main>
        <slot />
      </el-main>
      
      <el-footer>
        <DefaultFooter/>
      </el-footer>
    </el-container>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()

useHead({
  meta: [{ property: 'title', content: `应用名称 - ${route.meta.title}` }]
})
</script>
