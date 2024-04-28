/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'OWNER';

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_owner_id_fkey";

-- DropIndex
DROP INDEX "Organization_owner_id_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "owner_id";
