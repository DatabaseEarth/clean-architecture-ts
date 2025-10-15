/*
  Warnings:

  - You are about to drop the column `version` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "version";

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_phone_key" ON "users"("email", "phone");
