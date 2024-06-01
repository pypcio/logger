/*
  Warnings:

  - You are about to drop the column `organizationName` on the `EventGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventGroup" DROP COLUMN "organizationName",
ADD COLUMN     "organizationId" TEXT;

-- CreateIndex
CREATE INDEX "EventGroup_organizationId_idx" ON "EventGroup"("organizationId");

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "EventGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
