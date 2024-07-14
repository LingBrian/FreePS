import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = {
    name:
      (await db.application.findFirst({
        where: {
          name: body.name,
        },
      })) == null,
  };
  await db.$disconnect();
  return res;
});
