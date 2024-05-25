/*
  Warnings:

  - You are about to drop the column `eventGroupId` on the `Inverter` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroupId` on the `Logger` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroupId` on the `Meter` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroupId` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroupId` on the `SecurityDevice` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Inverter_eventGroupId_key";

-- DropIndex
DROP INDEX "Logger_eventGroupId_key";

-- DropIndex
DROP INDEX "Meter_eventGroupId_key";

-- DropIndex
DROP INDEX "SecurityDevice_eventGroupId_key";

-- AlterTable
ALTER TABLE "Inverter" DROP COLUMN "eventGroupId";

-- AlterTable
ALTER TABLE "Logger" DROP COLUMN "eventGroupId";

-- AlterTable
ALTER TABLE "Meter" DROP COLUMN "eventGroupId";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "eventGroupId";

-- AlterTable
ALTER TABLE "SecurityDevice" DROP COLUMN "eventGroupId";
