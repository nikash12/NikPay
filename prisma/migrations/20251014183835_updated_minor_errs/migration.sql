/*
  Warnings:

  - The values [Google,Email,Phone] on the enum `AuthType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `OTP` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthType_new" AS ENUM ('OTP');
ALTER TABLE "public"."Merchant" ALTER COLUMN "auth_type" DROP DEFAULT;
ALTER TABLE "Merchant" ALTER COLUMN "auth_type" TYPE "AuthType_new" USING ("auth_type"::text::"AuthType_new");
ALTER TYPE "AuthType" RENAME TO "AuthType_old";
ALTER TYPE "AuthType_new" RENAME TO "AuthType";
DROP TYPE "public"."AuthType_old";
ALTER TABLE "Merchant" ALTER COLUMN "auth_type" SET DEFAULT 'OTP';
COMMIT;

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "auth_type" SET DEFAULT 'OTP';

-- DropTable
DROP TABLE "public"."OTP";

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_number_key" ON "otp"("number");
