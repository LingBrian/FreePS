export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useCookie("auth");
  if (auth.value === undefined) {
  } else {
    return navigateTo("/");
  }
});
