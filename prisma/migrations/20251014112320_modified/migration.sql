/*
  Warnings:

  - You are about to drop the column `password` on the `Merchant` table. All the data in the column will be lost.
  - Made the column `number` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "password",
ALTER COLUMN "number" SET NOT NULL;
