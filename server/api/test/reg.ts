import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return {
    username:
      (await db.user.findFirst({
        where: {
          username: body.username,
        },
      })) == null,
    phone:
      (await db.user.findFirst({
        where: {
          phone: body.phone,
        },
      })) == null,
  };
});
