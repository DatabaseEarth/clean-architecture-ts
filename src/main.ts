import "dotenv/config";
import { bootstrap } from "./presentation/nestjs/src/main";
import { AppDataSource } from "@/infrastructure/database/typeorm/data-source";

async function runServer() {
  console.log("🚀 Clean Architecture + DDD App starting...");

  try {
    await AppDataSource.initialize(); // <-- khởi tạo DB
    console.log("✅ Database connected");

    await bootstrap(); // khởi chạy NestJS
  } catch (err) {
    console.error("❌ Failed to start app:", err);
    process.exit(1);
  }
}

runServer();
