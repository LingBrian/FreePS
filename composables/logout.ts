// 它将作为 useFoo() 可用（文件名的驼峰形式，不包括扩展名）

export default function () {
  const auth = useCookie("auth");
  $fetch("/api/user/logout", {
    method: "POST",
    body: {
      auth: auth.value,
    },
  });
  auth.value = undefined;
  navigateTo("/");
  return 1;
}
