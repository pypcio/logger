/*
  Warnings:

  - You are about to drop the column `eventGroupId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroupId` on the `Plant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Device_eventGroupId_key";

-- DropIndex
DROP INDEX "Plant_eventGroupId_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "eventGroupId";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "eventGroupId";
