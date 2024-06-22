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
          rules="required"
        />
        <SelectElement
          name="select"
          default="辽宁一区"
          label="地区"
          :native="false"
          :items="['辽宁一区', '辽宁二区', '江西一区']"
          :columns="{ container: 4, label: 3, wrapper: 12 }"
          rules="required"
        />
        <RadiogroupElement
          default="2 Core"
          label="CPU核心数"
          name="cpu"
          :items="['2 Core', '4 Core', '6 Core', 'More']"
          view="tabs"
        />
        <RadiogroupElement
          default="2 GB"
          label="RAM容量"
          name="ram"
          :items="['2 GB', '4 GB', '6 GB', 'More']"
          view="tabs"
        />

        <SliderElement
          name="disk"
          label="磁盘容量"
          :default="5"
          :min="1"
          :max="40"
          :format="(v: number) => v > 1 ? `${Math.round(v)} GB` : '1 GB'"
          :add-classes="{
            ElementLayout: {
              innerWrapper: 'mt-12',
            },
          }"
        />

        <EditorElement name="usage" label="用途说明" rules="required|max:500" />

        <ButtonElement
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
import PhoneElemen from "@vueform/vueform";
definePageMeta({
  middleware: ["auth"],
});
const form = ref();
</script>
