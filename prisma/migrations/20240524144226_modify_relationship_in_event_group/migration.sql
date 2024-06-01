/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `EventGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Inverter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Logger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Meter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `SecurityDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `EventGroup` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "EventGroup" ADD COLUMN     "deviceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventGroup_deviceId_key" ON "EventGroup"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Inverter_eventGroupId_key" ON "Inverter"("eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Logger_eventGroupId_key" ON "Logger"("eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Meter_eventGroupId_key" ON "Meter"("eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityDevice_eventGroupId_key" ON "SecurityDevice"("eventGroupId");

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "plantDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "loggerDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Logger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "meterDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Meter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "inverterDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Inverter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "secDevDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "SecurityDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
