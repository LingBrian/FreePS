<template>
  <!--登录界面-->
  <Head>
    <Title>登录界面</Title>
    <Meta name="description" />
  </Head>
  <div
    style="width: 25%; margin: auto"
    :style="{
      boxShadow: `var(--el-box-shadow-light)`,
    }"
  >
    <ClientOnly>
      <Vueform
        endpoint="/api/test"
        method="POST"
        view="tabs"
        style="padding: 30px"
      >
        <StaticElement tag="h4" align="center" content="登录" name="static" />
        <PhoneElement
          input-type="number"
          name="phone"
          allow-incomplete
          unmask
          default="+86"
          :include="['cn']"
          label="手机号"
          placeholder="+86"
          :columns="{ container: 12, label: 3, wrapper: 10 }"
          rules="required|min:14|max:14"
        />
        <TextElement
          input-type="password"
          name="password"
          label="密码"
          rules="required|min:8|max:16|confirmed"
          :columns="{ container: 12, label: 3, wrapper: 10 }"
        />
        <CheckboxElement
          name="policy"
          label="用户协议"
          rules="required"
          message="您必须同意用户政策才能继续"
        >
          已阅读并同意<ElLink href="/" target="_blank">《用户协议》</ElLink>
        </CheckboxElement>
        <CheckboxElement name="news"> 希望获取最新资讯 </CheckboxElement>
        <ButtonElement
          name="submit"
          button-label="登录"
          align="center"
          size="lg"
          submits
        />
      </Vueform>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import PhoneElemen from "@vueform/vueform";
const form = ref();
</script>
