const auth = useCookie("auth");
$fetch("/api/user/logout", {
  method: "POST",
  body: {
    auth: auth.value,
  },
});
auth.value = undefined;
navigateTo("/");
