export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useCookie("auth");
  if (auth.value === undefined) {
    ElMessage("未登录或cookie未开启");
    return navigateTo("/user/login", { replace: true });
  } else {
    const { data: result } = await useFetch("/api/user/auth", {
      method: "post",
      body: {
        auth: auth.value,
      },
    });
    if (!result.value?.login && to.path !== "/user/test") {
      if (result.value?.code == 0) {
        ElMessage("未登录");
      } else if (result.value?.code == 2) {
        ElMessage("登录超时，请重新登录");
        auth.value = undefined;
      } else {
        ElMessage(result.value?.code);
      }
      return navigateTo("/user/login");
    } else {
      console.log(auth.value);
    }
  }
});
