<template>
  <!--登录界面-->
  <Head>
    <Title>登录界面</Title>
    <Meta name="description" />
  </Head>
  <div
    class="formbox"
    :style="{
      boxShadow: `var(--el-box-shadow-light)`,
    }"
  >
    <ClientOnly>
      <Vueform
        endpoint="/api/user/login"
        method="POST"
        view="tabs"
        style="padding: 30px"
        @success="PostSuccess"
      >
        <StaticElement tag="h4" align="center" content="登录" name="static" />
        <TextElement
          ref="phone$"
          name="phone"
          allow-incomplete
          label="手机号"
          placeholder="+86"
          :columns="{ container: 12, label: 3, wrapper: 10 }"
          rules="required|min:11|max:11"
        />
        <TextElement
          input-type="password"
          name="password"
          allow-incomplete
          label="密码"
          rules="required|min:8|max:16"
          :columns="{ container: 12, label: 3, wrapper: 10 }"
        />
        <HiddenElement :default="ip" name="client_ip" />
        <CheckboxElement
          name="policy"
          label="用户协议"
          rules="required"
          message="您必须同意用户政策才能继续"
        >
          已阅读并同意<ElLink href="/" target="_blank">《用户协议》</ElLink>
        </CheckboxElement>
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
definePageMeta({
  middleware: ["unauth"],
});
const form = ref();
const data: { query: string } = await $fetch("http://ip-api.com/json");
const ip = data.query;
function PostSuccess(response: {
  data: {
    code: number;
    msg: string;
    token: string;
  };
}) {
  if (response.data.code == 1) {
    ElMessage({ message: response.data.msg, type: "success" });
    const auth = useCookie("auth", { maxAge: 60 * 30 });
    auth.value = response.data.token;
    location.reload();
    navigateTo("/", { replace: true });
  } else if (response.data.code == -1) {
    ElMessage({ message: response.data.msg, type: "warning" });
    navigateTo("/user/register");
  } else {
    ElMessage({ message: response.data.msg, type: "warning" });
  }
}
</script>
<style>
.formbox {
  width: 25%;
  margin: auto;
}
@media screen and (min-width: 901px) and (max-width: 1200px) {
  .formbox {
    width: 50%;
    margin: auto;
  }
}
@media screen and (min-width: 601px) and (max-width: 900px) {
  .formbox {
    width: 75%;
    margin: auto;
  }
}
@media screen and (max-width: 600px) {
  .formbox {
    width: 88%;
    margin: auto;
  }
}
</style>
