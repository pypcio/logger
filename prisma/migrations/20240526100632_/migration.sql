/*
  Warnings:

  - Made the column `organizationId` on table `EventGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "EventGroup_organizationId_fkey";

-- AlterTable
ALTER TABLE "EventGroup" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "EventGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
