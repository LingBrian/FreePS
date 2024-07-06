<template>
  <!--立即申请页面-->
  <Head>
    <Title>立即申请</Title>
    <Meta name="description" />
  </Head>
  <div
    style="width: 50%; margin: auto"
    :style="{
      boxShadow: `var(--el-box-shadow-light)`,
    }"
  >
    <ClientOnly>
      <Vueform
        @success="AppSuccess"
        endpoint="/api/test"
        method="POST"
        view="tabs"
        style="padding: 30px"
      >
        <StaticElement
          tag="h4"
          align="center"
          content="项目详情"
          name="static"
        />
        <TextElement
          name="name"
          label="项目名称"
          placeholder="项目名称"
          :columns="{ container: 4, label: 4, wrapper: 12 }"
          :rules="['required', isCreate]"
        />
        <SelectElement
          name="area"
          default="1"
          label="地区"
          :native="false"
          :items="{ 1: '辽宁一区', 2: '辽宁二区', 3: '江西一区' }"
          :columns="{ container: 4, label: 3, wrapper: 12 }"
          rules="required"
        />
        <RadiogroupElement
          default="2"
          label="CPU核心数"
          name="cpu"
          :items="{ 2: '2 Core', 4: '4 Core', 6: '6 Core', 10: 'More' }"
          view="tabs"
        />
        <RadiogroupElement
          default="2"
          label="RAM容量"
          name="ram"
          :items="{ 2: '2 GB', 4: '4 GB', 6: '6 GB', 10: 'More' }"
          view="tabs"
        />

        <SliderElement
          sync
          name="disk"
          label="磁盘容量"
          :default="5"
          :min="1"
          :max="40"
          :format="(v: number) => v > 1 ? `${Math.round(v)} GB` : '1 GB'"
          :columns="{ container: 12, label: 12, wrapper: 12 }"
          :add-classes="{
            ElementLayout: {
              innerWrapper: 'mt-12',
            },
          }"
        />
        <EditorElement
          name="desc"
          label="用途说明"
          rules="required|max:500"
          :hide-tools="['attach']"
        />
        <StaticElement
          label="人机验证"
          name="static"
          :columns="{ container: 12, label: 12, wrapper: 12 }"
        >
          <DefaultSilderVerify
            @success="sliderHandleSuccess"
            @failed="sliderHandleError"
          />
        </StaticElement>
        <HiddenElement :default="uid" name="uid" />
        <HiddenElement :default="auth" name="auth" />
        <ButtonElement
          :disabled="isBot"
          name="submit"
          button-label="提交申请"
          align="center"
          size="lg"
          submits
        />
      </Vueform>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { Validator } from "@vueform/vueform";
definePageMeta({
  middleware: ["auth"],
});
const uid: number = await getUserId();
const isBot = ref(true);
const auth = useCookie("auth");
function sliderHandleSuccess() {
  ElMessage({ message: "人机验证已通过", type: "success" });
  isBot.value = false;
}
function sliderHandleError() {
  ElMessage({ message: "人机验证未通过", type: "warning" });
}
const isCreate = class extends Validator {
  get msg() {
    return "项目名已存在";
  }
  check(value: string) {
    if (value == "") {
      return 0;
    }
    return $fetch("/api/application", {
      method: "POST",
      body: { name: value },
    }).then((res) => {
      return res.name;
    });
  }
};
const form = ref();
function AppSuccess(response: { data: { code: number; msg: string } }) {
  if (response.data.code) {
    ElMessage({ message: response.data.msg, type: "success" });
    navigateTo("/");
  } else {
    ElMessage({ message: response.data.msg, type: "warning" });
  }
}
</script>
