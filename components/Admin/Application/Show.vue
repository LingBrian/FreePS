<template>
  <el-button plain @click="open">查看</el-button>
</template>
<script setup lang="ts">
import type { Action } from "element-plus";

const props = defineProps(["desc", "name"]);
const open = () => {
  ElMessageBox.alert(props.desc, props.name, {
    // if you want to disable its autofocus
    // autofocus: false,
    dangerouslyUseHTMLString: true,
    confirmButtonText: "OK",
    callback: (action: Action) => {
      /* ElMessage({
        type: "info",
        message: `action: ${action}`,
      }); */
    },
  });
};
</script>
