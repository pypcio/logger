/*
  Warnings:

  - You are about to drop the column `uniqueId` on the `OrganizationMembership` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrganizationMembership_uniqueId_key";

-- AlterTable
ALTER TABLE "OrganizationMembership" DROP COLUMN "uniqueId";
