<template slot-scope>
  <!--主页面-->
  <Head>
    <Title>FreePotato Server</Title>
    <Meta name="description" content="免费服务器~" />
  </Head>
  <ElRow :gutter="10" align="middle" style="height: 900px">
    <ElCol :span="24"><IndexNewsCarouel /></ElCol>
    <ElCol :span="24"><IndexNewsStatus /></ElCol>
  </ElRow>
</template>
<script setup lang="ts"></script>
