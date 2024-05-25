/*
  Warnings:

  - You are about to drop the column `deviceId` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,eventGroupId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Inverter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Logger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Meter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventGroupId]` on the table `SecurityDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventGroupId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Inverter_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Logger_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Meter_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Plant_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "SecurityDevice_id_fkey";

-- DropIndex
DROP INDEX "Event_deviceId_idx";

-- DropIndex
DROP INDEX "Event_name_deviceId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "deviceId",
ADD COLUMN     "eventGroupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inverter" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "Meter" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "SecurityDevice" ADD COLUMN     "eventGroupId" TEXT;

-- CreateTable
CREATE TABLE "EventGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_eventGroupId_idx" ON "Event"("eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_eventGroupId_key" ON "Event"("name", "eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Inverter_eventGroupId_key" ON "Inverter"("eventGroupId");

-- CreateIndex
CREATE INDEX "Inverter_plant_id_idx" ON "Inverter"("plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Logger_eventGroupId_key" ON "Logger"("eventGroupId");

-- CreateIndex
CREATE INDEX "Logger_plant_id_idx" ON "Logger"("plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Meter_eventGroupId_key" ON "Meter"("eventGroupId");

-- CreateIndex
CREATE INDEX "Meter_plant_id_idx" ON "Meter"("plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_eventGroupId_key" ON "Plant"("eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityDevice_eventGroupId_key" ON "SecurityDevice"("eventGroupId");

-- CreateIndex
CREATE INDEX "SecurityDevice_plant_id_idx" ON "SecurityDevice"("plant_id");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meter" ADD CONSTRAINT "Meter_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityDevice" ADD CONSTRAINT "SecurityDevice_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
