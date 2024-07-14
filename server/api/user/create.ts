import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const register = await db.register.findFirst({
    where: {
      phone: body.phone,
    },
    orderBy: {
      deadline: "desc", // 'asc' 表示升序，'desc' 表示降序
    },
  });
  if (register != null) {
    const deadlineDate = new Date(register.deadline.getTime() + 7 * 60 * 1000);
    const now = new Date();
    if (now <= deadlineDate) {
      if (register.code != body.code) {
        return { code: 0, msg: "验证码错误请重新发送" + register };
      } else {
        await db.user.create({
          data: {
            username: body.username,
            phone: body.phone,
            password: (await import("crypto"))
              .createHash("md5")
              .update(body.password)
              .digest("hex"),
          },
        });
        await db.$disconnect();
        return { code: 1, msg: "注册成功" };
      }
    } else {
      await db.$disconnect();
      return {
        code: -1,
        msg: "验证码超时",
      };
    }
  } else {
    await db.$disconnect();
    return {
      code: -1,
      msg: "验证码超时",
    };
  }
});
