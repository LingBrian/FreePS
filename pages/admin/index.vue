<template>
  <Head>
    <Title>管理界面</Title>
    <Meta name="description" />
  </Head>
  <client-only>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="AppID" width="180" />
      <el-table-column prop="applicant" label="申请人" width="180" />
      <el-table-column prop="area" label="地区" width="180" />
      <el-table-column label="配置" width="300">
        <template #default="scope">
          <el-icon color="blue"><ElIcon-Cpu /></el-icon>
          {{ scope.row.cpu }} Core
          <el-icon color="green"><ElIcon-Stopwatch /></el-icon
          >{{ scope.row.ram }} GB
          <el-icon color="gray"><ElIcon-Memo /></el-icon>
          {{ scope.row.disk }} GB
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="用途" width="360" />
      <el-table-column label="状态" width="300">
        <template #default="scope">
          <el-icon :color="scope.row.deploy ? 'green' : 'orange'"
            ><ElIcon-Stamp
          /></el-icon>
          {{ scope.row.deploy ? "通过" : "待审核" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="success"
            @click="ElMessage({ message: '同意', type: 'success' })"
          >
            同意
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="ElMessage({ message: '拒绝', type: 'warning' })"
          >
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </client-only>
</template>
<script lang="ts" setup>
import type { Application } from "~/types/Application";
const data: Application[] = await $fetch("/api/admin/applications");
const tableData = ref(data);
</script>
