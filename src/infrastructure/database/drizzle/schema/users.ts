import { pgTable, varchar, unique } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";

export const users = pgTable(
  "users",
  {
    ...baseColumns,
    email: varchar("email", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    password: varchar("password", { length: 500 }).notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
  },
  (table) => ({
    emailPhoneUnique: unique("email_phone_unique").on(table.email, table.phone),
  })
);
