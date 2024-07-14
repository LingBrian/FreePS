<template slot-scope>
  <!--注册页面-->
  <Head>
    <Title>注册页面</Title>
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
        endpoint="/api/user/create"
        method="POST"
        view="tabs"
        :model-value="form"
        @update:model-value="form = $event"
        @success="RegSuccess"
        validate-on="change"
        style="padding: 5%"
      >
        <StaticElement tag="h4" align="center" content="注册" name="static" />
        <TextElement
          ref="username$"
          name="username"
          allow-incomplete
          label="昵称"
          placeholder="昵称"
          :columns="{ container: 12, label: 3, wrapper: 8 }"
          rules="required|min:3|max:64"
          @input="Check()"
        />
        <TextElement
          ref="phone$"
          name="phone"
          allow-incomplete
          label="手机号"
          placeholder="+86"
          :columns="{ container: 12, label: 3, wrapper: 10 }"
          rules="required|min:11|max:11"
          @input="Check()"
          :disabled="phoneChecked"
        />
        <StaticElement
          name="static"
          :columns="{ container: 12, label: 3, wrapper: 12 }"
        >
          <DefaultSilderVerify
            @success="sliderHandleSuccess"
            @failed="sliderHandleError"
          />
        </StaticElement>

        <TextElement
          name="code"
          label="验证码"
          placeholder="xxxxxx"
          rules="required|max:6|min:6"
          :columns="{ container: 8, label: 5, wrapper: 12 }"
          @blur="CheckCode()"
          :disabled="!codeBtnRef.disabled || phoneChecked"
          ref="code$"
        />
        <ButtonElement
          name="button"
          :columns="{ container: 4, label: 4, wrapper: 12 }"
          @click="Send()"
          :button-label="codeBtnRef.text"
          :disabled="codeBtnRef.disabled || phoneChecked"
        />
        <TextElement
          input-type="password"
          name="password"
          label="密码"
          rules="required|min:8|max:16|confirmed"
          :columns="{ container: 12, label: 3, wrapper: 10 }"
        />
        <TextElement
          input-type="password"
          name="password_confirmation"
          label="确认密码"
          rules="required|min:8|max:16"
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
        <ButtonElement
          :disabled="canSubmit"
          name="submit"
          button-label="注册"
          align="center"
          size="lg"
          submits
        /><ButtonElement
          name="reset"
          danger
          button-label="重置"
          resets
          size="sm"
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
const form = ref({});
const phoneChecked = ref(false);
const codeBtnRef = ref({ text: "发送验证码", color: "", disabled: false });
const username$ = ref(null);
const phone$ = ref(null);
const code$ = ref(null);
const canSubmit = ref(false);
let isBot = true;
function sliderHandleSuccess() {
  ElMessage({ message: "人机验证已通过", type: "success" });
  isBot = false;
}
function sliderHandleError() {
  ElMessage({ message: "人机验证未通过", type: "warning" });
}
function Check() {
  const query = {
    username: form.value.username,
    phone: form.value.phone || "",
  };
  if (!/^(?!1(4|7)\d{9})1[3-9]\d{9}$/.test(query.phone) && query.phone != "") {
    username$.value.messageBag.clear("errors");
    username$.value.messageBag.append("手机号格式错误" + query.phone);
    canSubmit.value = true;
    return;
  } else {
    username$.value.messageBag.clear("errors");
  }
  $fetch("/api/reg", {
    method: "POST",
    body: query,
  }).then((res) => {
    if (!res.phone) {
      username$.value.messageBag.append("手机号已经注册");
      canSubmit.value = true;
      return 0;
    } else {
      username$.value.messageBag.clear("errors");
      canSubmit.value = false;
    }
    if (!res.username) {
      username$.value.messageBag.append("昵称已存在");
      canSubmit.value = true;
    } else {
      username$.value.messageBag.clear("errors");
      canSubmit.value = false;
    }
  });
}
function Send() {
  if (isBot) {
    ElMessage({ message: "人机验证未通过", type: "warning" });
    return;
  }
  Check();

  if (!canSubmit.value) {
    $fetch("/api/reg/sms", {
      method: "POST",
      body: {
        phone: form.value.phone,
      },
    }).then((res) => {
      switch (res.code) {
        case 0:
          ElMessage({ message: res.msg + "\n" + res.error, type: "error" });
          break;
        case 1:
          ElMessage({ message: res.msg, type: "success" });
          codeBtnRef.value.disabled = true;
          codeBtnRef.value.text = "请查收";
          break;
        case 2:
          ElMessage({ message: res.msg, type: "warning" });
          codeBtnRef.value.disabled = true;
          codeBtnRef.value.text = "请查收";
          break;
        default:
          break;
      }
    });
  }
  console.info(form.value.phone.replace("+86", ""));
}
function CheckCode() {
  if (!code$.value.invalid) {
    $fetch("/api/reg/code", {
      method: "POST",
      body: {
        phone: form.value.phone.replace("+86", ""),
        code: form.value.code,
      },
    }).then((res) => {
      switch (res.code) {
        case 0:
          ElMessage({
            message: res.msg,
            type: "error",
          });
          break;
        case 1:
          ElMessage({ message: res.msg, type: "success" });
          codeBtnRef.value.disabled = true;
          codeBtnRef.value.text = "已验证";
          phoneChecked.value = true;
          break;
        case 2:
          ElMessage({ message: res.msg, type: "warning" });
          codeBtnRef.value.disabled = false;
          codeBtnRef.value.text = "发送验证码";
          break;
        default:
          ElMessage({ message: res.msg, type: "warning" });
          break;
      }
    });
  }
}
function RegSuccess(response: { data: { code: number; msg: string } }, form$) {
  if (response.data.code == 1) {
    ElMessage({ message: response.data.msg, type: "success" });
    navigateTo("/user/login");
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
@media screen and (max-width: 1200px) {
  .formbox {
    width: 100%;
  }
}
</style>
