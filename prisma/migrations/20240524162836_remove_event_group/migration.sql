/*
  Warnings:

  - You are about to drop the column `eventGroupId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventGroup` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,deviceId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "inverterDevice_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "loggerDevice_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "meterDevice_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "plantDevice_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "secDevDevice_fkey";

-- DropIndex
DROP INDEX "Event_eventGroupId_idx";

-- DropIndex
DROP INDEX "Event_name_eventGroupId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventGroupId",
ADD COLUMN     "deviceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "EventGroup";

-- CreateIndex
CREATE INDEX "Event_deviceId_idx" ON "Event"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_deviceId_key" ON "Event"("name", "deviceId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "plantDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "loggerDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Logger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "meterDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Meter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "inverterDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "Inverter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "secDevDevice_fkey" FOREIGN KEY ("deviceId") REFERENCES "SecurityDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
