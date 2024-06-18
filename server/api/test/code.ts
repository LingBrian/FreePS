import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const register = (await db.register.findFirst({
    where: {
      phone: body.phone,
    },
    orderBy: {
      deadline: "desc", // 'asc' 表示升序，'desc' 表示降序
    },
  })) || {
    phone: "",
    code: "",
    deadline: new Date(),
  };
  const deadlineDate = new Date(register.deadline);
  const now = new Date();
  if (now > deadlineDate) {
    return { code: 2, msg: "验证码超时了，请重新发送" };
  } else if (register.code != body.code) {
    console.log(body.code + " phone " + register.phone + " " + register.code);
    return { code: 0, msg: "验证码错误" };
  } else if (register.code == body.code) {
    return { code: 1, msg: "验证码正确" };
  } else {
    return { code: -1, msg: "未知错误" };
  }
});
