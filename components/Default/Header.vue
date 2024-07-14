<template>
  <client-only>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="/">
        <img style="width: 50px" src="/logo.svg" alt="Element logo" />
      </el-menu-item>
      <el-menu-item index="/apply">立即申请</el-menu-item>
      <el-menu-item index="/about" disabled>关于我们</el-menu-item>
      <el-menu-item index="/status" disabled>设备监控</el-menu-item>
      <el-sub-menu index="/area" disabled>
        <template #title>区域服务</template>
        <!--  <el-menu-item index="/area/ln1">辽宁一区</el-menu-item>
        <el-menu-item index="/area/ln2">辽宁二区</el-menu-item>
        <el-menu-item index="/area/jx1">江西一区</el-menu-item>
        <el-sub-menu index="/area/jx2">
            <template #title>江西二区</template>
            <el-menu-item index="/area/jx2/gpu">GPU服务器</el-menu-item>
            <el-menu-item index="/area/jx2/web">网页服务器</el-menu-item>
            <el-menu-item index="/area/jx2/game">游戏服务器</el-menu-item>
        </el-sub-menu> -->
      </el-sub-menu>
      <el-menu-item index="forum" disabled>论坛</el-menu-item>
      <el-menu-item index="host" disabled>托管</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item v-if="auth" index="/user/login">登录</el-menu-item>
      <el-menu-item v-if="auth" index="/user/register">注册</el-menu-item>
      <el-menu-item v-if="!auth" index="/admin">管理界面</el-menu-item>
      <el-menu-item v-if="!auth" @click="logoutNow">注销</el-menu-item>
    </el-menu>
  </client-only>
</template>

<script lang="ts" setup>
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  navigateTo(key);
};
const auth = ref(useCookie("auth").value == undefined);
function logoutNow() {
  logout();
  auth.value = true;
}
</script>
<style>
.flex-grow {
  flex-grow: 1;
}
</style>
