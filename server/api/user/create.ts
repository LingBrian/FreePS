import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
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
  return 1;
});
