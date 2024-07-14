import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const query: { auth: string } = getQuery(event);
  let userid: number = 0;
  userid = await db.loginlogs
    .findFirst({
      where: { token: query.auth },
      select: {
        userid: true,
      },
    })
    .then((res) => {
      if (res != null) {
        return res.userid;
      } else {
        return 0;
      }
    });
  //console.info(userid);
  return userid;
});
