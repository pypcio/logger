/*
  Warnings:

  - Made the column `organizationId` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_organizationId_fkey";

-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
