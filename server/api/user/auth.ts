import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function auth(auth: string) {
  const res = await db.loginlogs.findFirst({
    where: { token: auth },
  });
  //return JSON.stringify((await res).values)
  if (res == null) {
    return {
      login: false,
      code: 0, //未登录
    };
  } else {
    const deadlineDate = new Date(res.outtime);
    const now = new Date();
    if (now < deadlineDate) {
      return {
        login: true,
        code: 1, //登录状态正常
      };
    } else {
      return {
        login: false,
        code: 2, //登录超时
      };
    }
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return auth(body.auth);
});
