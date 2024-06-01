/*
  Warnings:

  - Made the column `eventGroupId` on table `Inverter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventGroupId` on table `Logger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventGroupId` on table `Meter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventGroupId` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventGroupId` on table `SecurityDevice` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Inverter" DROP CONSTRAINT "Inverter_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Meter" DROP CONSTRAINT "Meter_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "SecurityDevice" DROP CONSTRAINT "SecurityDevice_eventGroupId_fkey";

-- AlterTable
ALTER TABLE "Inverter" ALTER COLUMN "eventGroupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Logger" ALTER COLUMN "eventGroupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Meter" ALTER COLUMN "eventGroupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "eventGroupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SecurityDevice" ALTER COLUMN "eventGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meter" ADD CONSTRAINT "Meter_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityDevice" ADD CONSTRAINT "SecurityDevice_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
