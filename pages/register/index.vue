<template>
    <!--注册页面-->
    <Head>
      <Title>注册页面</Title>
      <Meta name="description"/>
    </Head>
        <div style="width:50%;margin:auto;" :style="{
            boxShadow: `var(--el-box-shadow-light)`,
          }">
            <ClientOnly >
                <Vueform endpoint="/api/test" method="POST" view="tabs" style="padding:30px" >
                  <StaticElement tag="h4" align="center" content="个人信息" name="static" />
                  <TextElement name="username" allow-incomplete label="昵称" placeholder="昵称"   :columns="{ container: 4, label: 3, wrapper: 8 }"  rules="required|min:3|max:64"/>
                  <PhoneElement  input-type="number" name="phone" allow-incomplete unmask  default="+86" :include="['cn']" label="手机号" placeholder="+86"  :columns="{ container: 12, label: 1, wrapper: 4 }"  rules="required|max:6|min:6"/>
                  <TextElement name="code" label="验证码" placeholder="xxxxxx"  :columns="{ container: 4, label: 3, wrapper: 12 }"  rules="required"/> 
                  <ButtonElement name="button"  :columns="{ container: 8, label: 3, wrapper: 12 }" button-label="发送验证码"/>
                  <TextElement input-type="password" name="password" label="密码"   rules="required|min:8|max:16|confirmed"/>
                  <TextElement input-type="password" name="password_confirmation" label="确认密码" rules="required|min:8|max:16"/>
                  <CheckboxElement name="policy" label="用户协议" rules="required" message="您必须同意用户政策才能继续">
                    已阅读并同意<ElLink href="/" target="_blank">《用户协议》</ElLink>
                  </CheckboxElement>
                  <CheckboxElement name="news">
                    希望获取最新资讯
                  </CheckboxElement>
            <ButtonElement name="submit" button-label="提交申请"  align="center" size="lg"  submits/>
                </Vueform>
              </ClientOnly>
              
        </div>
    </template>
    <script setup lang="ts">
    import PhoneElemen  from '@vueform/vueform'
    const form = ref()
    </script>