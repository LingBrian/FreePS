export default defineNuxtRouteMiddleware(async (to, from) => {
  if ((await getUserId()) != 1) {
    ElMessage("禁止访问");
    return navigateTo("/", { replace: true });
  }
});
