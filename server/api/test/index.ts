import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default defineEventHandler((event) => {
  return event;
});
