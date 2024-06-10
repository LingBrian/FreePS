import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.info(body);
  let isSend =
    (await db.register.findFirst({
      where: {
        phone: body.phone,
      },
    })) != null;
  if (isSend) {
    const register = (await db.register.findFirst({
      where: {
        phone: body.phone,
      },
      orderBy: {
        deadline: "desc", // 'asc' 表示升序，'desc' 表示降序
      },
    })) || {
      deadline: new Date(),
    };
    const deadlineDate = new Date(register.deadline);
    const now = new Date();
    if (now <= deadlineDate) {
      return { code: 2, msg: "三分钟内请勿重发送" };
    } else {
      return {
        code: -1,
        msg:
          "发送成功" + now + "<=" + deadlineDate + ":" + (now <= deadlineDate),
      };
    }
  }
  return isSend;
});
