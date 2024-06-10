<template>
  <!--注册页面-->
  <Head>
    <Title>注册页面</Title>
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
        :model-value="form"
        @update:model-value="form = $event"
        validate-on="change"
        style="padding: 30px"
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
          @blur="Check()"
        />
        <PhoneElement
          ref="phone$"
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
          @blur="Check()"
          :disabled="phoneChecked"
        />
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
          :columns="{ container: 4, label: 3, wrapper: 12 }"
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
        <CheckboxElement name="news"> 希望获取最新资讯 </CheckboxElement>
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
const form = ref({});
const phoneChecked = ref(false);
const codeBtnRef = ref({ text: "发送验证码", color: "", disabled: false });
const username$ = ref(null);
const phone$ = ref(null);
const code$ = ref(null);
const canSubmit = ref(false);
function Check() {
  const query = {
    username: form.value.username,
    phone: form.value.phone.replace("+86", ""),
  };
  if (!/^(?!1(4|7)\d{9})1[3-9]\d{9}$/.test(query.phone)) {
    phone$.value.messageBag.clear("errors");
    phone$.value.messageBag.append("手机号格式错误" + query.phone);
    canSubmit.value = true;
    return;
  } else {
    phone$.value.messageBag = [];
  }
  $fetch("/api/test/reg", {
    method: "POST",
    body: query,
  }).then((res) => {
    if (!res.phone) {
      phone$.value.messageBag.append("手机号已经注册");
      canSubmit.value = true;
    } else {
      canSubmit.value = false;
    }
    if (!res.username) {
      username$.value.messageBag.append("昵称已存在");
      canSubmit.value = true;
    } else {
      canSubmit.value = false;
    }
  });
}
function Send() {
  Check();
  if (!canSubmit.value) {
    $fetch("/api/test/sms", {
      method: "POST",
      body: {
        phone: form.value.phone.replace("+86", ""),
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
    $fetch("/api/test/code", {
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
          phoneChecked.value = ture;
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
</script>
