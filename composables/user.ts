export async function getUserId() {
  const auth = useCookie("auth");
  return await $fetch("/api/user/auth", {
    method: "GET",
    query: {
      auth: auth.value,
    },
  }).then((res: number) => {
    return res;
  });
}
