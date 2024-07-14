<template>
  <Head>
    <Title>登录日志</Title>
    <Meta name="description" />
  </Head>
  <client-only>
    <el-table
      :default-sort="{ prop: 'id', order: 'descending' }"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="50" />
      <el-table-column prop="username" label="用户" width="180" />
      <el-table-column prop="date" label="登录时间" width="180" />
      <el-table-column prop="ip" label="登录ip" width="180" />
    </el-table>
  </client-only>
</template>
<script lang="ts" setup>
import type { LoginLog } from "~/types/Log";
const data: LoginLog[] = await $fetch("/api/admin/loginlogs");
const tableData = ref(data);
</script>
