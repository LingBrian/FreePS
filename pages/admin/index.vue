<template>
  <Head>
    <Title>管理界面</Title>
    <Meta name="description" />
  </Head>
  <client-only>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="appid" label="AppID" width="180" />
      <el-table-column prop="name" label="申请人" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column label="配置" width="300">
        <template #default="scope">
          <el-icon color="blue"><ElIcon-Cpu /></el-icon>
          {{ scope.row.resource.cpu }} Core
          <el-icon color="green"><ElIcon-Stopwatch /></el-icon
          >{{ scope.row.resource.ram }} GB
          <el-icon color="gray"><ElIcon-Memo /></el-icon>
          {{ scope.row.resource.disk }} GB
        </template>
      </el-table-column>
      <el-table-column prop="usage" label="用途" width="360" />
      <el-table-column label="状态" width="300">
        <template #default="scope">
          <el-icon :color="scope.row.apply ? 'green' : 'orange'"
            ><ElIcon-Stamp
          /></el-icon>
          {{ scope.row.apply ? "通过" : "待审核" }}
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
const tableData = [
  {
    appid: "1",
    name: "漩葵",
    phone: 1922949224,
    usage: "用于开展服务",
    resource: {
      cpu: 1,
      ram: 2,
      disk: 10,
    },
    apply: false,
  },
  {
    appid: "2",
    name: "BrianLing",
    phone: 1922949224,
    usage: "用于开展服务",
    resource: {
      cpu: 1,
      ram: 2,
      disk: 10,
    },
    apply: true,
  },
];
</script>
