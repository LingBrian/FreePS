import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body: {
    name: string;
    area: string;
    cpu: string;
    ram: string;
    disk: string;
    desc: string;
    uid: string;
    auth: string;
  } = await readBody(event);
  const isAuth: { login: boolean; code: number } = await $fetch(
    "/api/user/auth",
    {
      method: "POST",
      body: {
        auth: body.auth,
      },
    }
  );
  if (isAuth.login) {
    await db.application.create({
      data: {
        name: body.name,
        area: body.area,
        cpu: parseInt(body.cpu),
        ram: parseInt(body.ram),
        disk: parseInt(body.disk),
        desc: body.desc,
        applicantId: parseInt(body.uid),
      },
    });

    await db.$disconnect();
    return {
      code: 1,
      msg: "申请提交成功",
    };
  } else {
    if (isAuth.code == 0) {
      console.error(isAuth);
      console.error(JSON.stringify(body));
      return {
        code: 0,
        msg: "未登录",
      };
    } else {
      return {
        code: 0,
        msg: "登陆超时",
      };
    }
  }
  return body;
});

/* { name: '1231',
    area: '1',
    cpu: '2',
    ram: '2',
    disk: '5',
    desc: '<div>12313</div>',
    uid: '1',
    auth: 'a19705902b2ba12fbe52930b34802ab1' } */
