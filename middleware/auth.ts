export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useCookie("auth");
  if (auth.value === undefined) {
    ElMessage("未登录或cookie未开启");
    return navigateTo("/user/login", { replace: true });
  } else {
    const result = await $fetch("/api/user/auth", {
      method: "post",
      body: {
        auth: auth.value,
      },
    });
    if (!result.login && to.path !== "/user/test") {
      if (result.code == 0) {
        ElMessage("未登录");
      } else if (result.code == 2) {
        ElMessage("登录超时，请重新登录");
        auth.value = undefined;
      } else {
        ElMessage("error" + result.code);
      }
      return navigateTo("/user/login");
    } else {
      //console.log(auth.value);
    }
  }
});
