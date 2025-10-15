import "dotenv/config";
import { bootstrap } from "./presentation/nestjs/src/main";
import { PrismaClient } from "@prisma/client";

async function runServer() {
  console.log("🚀 Clean Architecture + DDD App starting...");

  try {
    // Khởi tạo Prisma connection
    const prismaClient = new PrismaClient();
    await prismaClient.$connect(); // <-- khởi tạo DB
    console.log("✅ Database connected");

    await bootstrap(); // khởi chạy NestJS
  } catch (err) {
    console.error("❌ Failed to start app:", err);
    process.exit(1);
  }
}

runServer();
