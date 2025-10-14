import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { users } from "./users";

export const refreshTokens = pgTable("refresh_tokens", {
  ...baseColumns,
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 500 }).notNull(),
  sessionId: uuid("session_id").notNull(),
  deviceInfo: varchar("device_info", { length: 255 }),
  ipAddress: varchar("ip_address", { length: 50 }),
});
