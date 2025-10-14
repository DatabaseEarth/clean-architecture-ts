import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const baseColumns = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedBy: uuid("updated_by"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deletedBy: uuid("deleted_by"),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};
