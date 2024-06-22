<template>
  <Head>
    <Title>用户信息</Title>
    <Meta name="description" />
  </Head>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
