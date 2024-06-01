/*
  Warnings:

  - You are about to drop the column `inverter_id` on the `SecurityDeviceLog` table. All the data in the column will be lost.
  - Added the required column `security_id` to the `SecurityDeviceLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SecurityDeviceLog" DROP CONSTRAINT "SecurityDeviceLog_inverter_id_fkey";

-- AlterTable
ALTER TABLE "SecurityDeviceLog" DROP COLUMN "inverter_id",
ADD COLUMN     "security_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Action_eventId_idx" ON "Action"("eventId");

-- CreateIndex
CREATE INDEX "Action_userId_idx" ON "Action"("userId");

-- CreateIndex
CREATE INDEX "Event_eventGroupId_idx" ON "Event"("eventGroupId");

-- CreateIndex
CREATE INDEX "InverterLog_inverter_id_idx" ON "InverterLog"("inverter_id");

-- CreateIndex
CREATE INDEX "LoggerLog_logger_id_idx" ON "LoggerLog"("logger_id");

-- CreateIndex
CREATE INDEX "MeterLog_meter_id_idx" ON "MeterLog"("meter_id");

-- CreateIndex
CREATE INDEX "SecurityDeviceLog_security_id_idx" ON "SecurityDeviceLog"("security_id");

-- AddForeignKey
ALTER TABLE "SecurityDeviceLog" ADD CONSTRAINT "SecurityDeviceLog_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "SecurityDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
