/*
  Warnings:

  - Made the column `plantId` on table `EventGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventGroup" ALTER COLUMN "plantId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "EventGroup_plantId_idx" ON "EventGroup"("plantId");
