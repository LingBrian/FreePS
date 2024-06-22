import { PrismaClient } from "@prisma/client";
import type { LoginLog } from "~/types/Log";
const db = new PrismaClient();
type log = { loginer: { username: string | null } } & {
  id: number;
  outtime: Date;
  ip: string;
  userid: number;
  token: string;
};
function formatLogs(raw: log[]): LoginLog[] {
  var logs: LoginLog[] = [];
  raw.forEach((element: log) => {
    logs.push({
      id: element.id,
      username: element.loginer.username || "none",
      date: new Date(element.outtime.getTime() - 1800000).toLocaleTimeString(),
      ip: element.ip,
    });
  });
  return logs;
}
export default defineEventHandler(async (event) => {
  const loginlogs = await db.loginlogs.findMany({
    orderBy: {
      outtime: "desc", // 'asc' 表示升序，'desc' 表示降序
    },
    include: {
      loginer: {
        select: {
          username: true,
        },
      },
    },
  });
  await db.$disconnect();
  return formatLogs(loginlogs);
});
