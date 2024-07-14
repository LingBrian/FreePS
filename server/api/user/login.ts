import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
function generateDeadline() {
  const now = new Date(); // 获取当前时间
  const threeMinutesLater = new Date(now.getTime() + 30 * 60 * 1000); // 加上30分钟
  return threeMinutesLater.toISOString(); // 转换为ISO格式字符串
}
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
      const token = (await import("crypto"))
        .createHash("md5")
        .update(body.password + new Date().toISOString())
        .digest("hex");
      await db.loginlogs.create({
        data: {
          userid: loginer.id,
          outtime: generateDeadline(),
          token: token,
          ip: body.client_ip,
        },
      });
      await db.$disconnect();
      return { code: 1, msg: "登录成功", token: token };
    } else {
      await db.$disconnect();
      return {
        code: 0,
        msg: "用户名、手机号或密码错误" /* + JSON.stringify(body) */,
      };
    }
  }
});
