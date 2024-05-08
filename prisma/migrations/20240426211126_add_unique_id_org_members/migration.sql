/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `OrganizationMembership` will be added. If there are existing duplicate values, this will fail.
  - The required column `uniqueId` was added to the `OrganizationMembership` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "OrganizationMembership" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMembership_uniqueId_key" ON "OrganizationMembership"("uniqueId");
