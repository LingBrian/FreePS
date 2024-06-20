import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const loginer = await db.user.findFirst({
    where: {
      phone: body.phone,
    },
  });
  if (loginer == null) {
    return { code: -1, msg: "未注册" };
  } else {
    if (
      loginer.password ==
      (await import("crypto"))
        .createHash("md5")
        .update(body.password)
        .digest("hex")
    ) {
      return { code: 1, msg: "登录成功" };
    } else {
      return { code: 0, msg: "用户名、手机号或密码错误" };
    }
  }
});
