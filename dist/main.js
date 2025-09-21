"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const main_1 = require("./presentation/nestjs/src/main");
const data_source_1 = require("./infrastructure/databse/typeorm/data-source");
async function runServer() {
    console.log("🚀 Clean Architecture + DDD App starting...");
    try {
        await data_source_1.AppDataSource.initialize(); // <-- khởi tạo DB
        console.log("✅ Database connected");
        await (0, main_1.bootstrap)(); // khởi chạy NestJS
    }
    catch (err) {
        console.error("❌ Failed to start app:", err);
        process.exit(1);
    }
}
runServer();
//# sourceMappingURL=main.js.map