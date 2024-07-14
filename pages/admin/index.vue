<template>
  <Head>
    <Title>管理界面</Title>
    <Meta name="description" />
  </Head>
  <client-only>
    <el-container>
      <el-aside width="64px">
        <el-menu default-active="2" class="el-menu-vertical-demo" collapse>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><Stamp /></el-icon>
            <template #title>申请审批</template>
          </el-menu-item>
          <el-menu-item index="3" @click="navigateTo('/admin/loginlogs')">
            <el-icon><TakeawayBox /></el-icon>
            <template #title>日志</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="area">
          <AdminApplicationDataTable />
        </div>
      </el-main>
    </el-container>
  </client-only>
</template>
<script lang="ts" setup>
import { Location, Setting, Stamp, TakeawayBox } from "@element-plus/icons-vue";
</script>
<style></style>
