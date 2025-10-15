import "dotenv/config";
import path from "node:path";
import { PrismaConfig } from "prisma/config";

export default {
  schema: path.join("prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  enums: {},
  tables: {},
  views: {},
} satisfies PrismaConfig;
