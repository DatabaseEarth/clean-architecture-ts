import "dotenv/config";
import { bootstrap } from "./presentation/nestjs/src/main";
import { pool } from "@/infrastructure/database/drizzle/config";

async function runServer() {
  console.log("🚀 Clean Architecture + DDD App starting...");

  try {
    // Test database connection
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✅ Database connected");

    await bootstrap(); // khởi chạy NestJS
  } catch (err) {
    console.error("❌ Failed to start app:", err);
    process.exit(1);
  }
}

runServer();
