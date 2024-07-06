import { PrismaClient } from "@prisma/client";
import type { Application } from "~/types/Application";
const db = new PrismaClient();
type app = {
  applicant: {
    username: string | null;
  };
} & {
  id: number;
  name: string;
  area: string;
  cpu: number;
  ram: number;
  disk: number;
  desc: string;
  deploy: boolean;
  applicantId: number;
};
function formatApplication(raw: app[]): Application[] {
  var logs: Application[] = [];
  raw.forEach((element: app) => {
    logs.push({
      id: element.id,
      area: element.area,
      name: element.name,
      applicant: element.applicant.username || "none",
      cpu: element.cpu,
      ram: element.ram,
      disk: element.disk,
      desc: element.desc,
      deploy: element.deploy,
    });
  });
  return logs;
}
export default defineEventHandler(async (event) => {
  const applications = await db.application.findMany({
    orderBy: {
      id: "desc", // 'asc' 表示升序，'desc' 表示降序
    },
    include: {
      applicant: {
        select: {
          username: true,
        },
      },
    },
  });
  await db.$disconnect();
  return formatApplication(applications);
});
