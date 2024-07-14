import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.loginlogs.update({
    where: {
      token: body.auth,
    },
    data: {
      outtime: new Date().toISOString(),
    },
  });
  await db.$disconnect();
  return 1;
});
