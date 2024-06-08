-- CreateEnum
CREATE TYPE "EventTopic" AS ENUM ('AMBIENT_TEMPERATURE', 'BATTERY_HEALTH', 'BATTERY_LEVEL', 'CURRENT', 'EFFICIENCY', 'ENERGY_OUTPUT', 'FREQUENCY', 'LOG_INTERVAL', 'MOTION_DETECTED', 'NETWORK_STATUS', 'OUTPUT_POWER', 'PANEL_TEMPERATURE', 'POWER', 'SIGNAL_STRENGTH', 'SOLAR_IRRADIANCE', 'STATUS', 'STORAGE_CAPACITY', 'SWITCH_BREAKER', 'TAMPER_ALERT', 'TEMPERATURE', 'VOLTAGE');

-- AlterTable
ALTER TABLE "EventGroup" ADD COLUMN     "topic" "EventTopic";

-- CreateTable
CREATE TABLE "EventGroupMapper" (
    "eventGroupId" TEXT NOT NULL,
    "slaveId" INTEGER NOT NULL,
    "masterId" INTEGER NOT NULL,

    CONSTRAINT "EventGroupMapper_pkey" PRIMARY KEY ("eventGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventGroupMapper_eventGroupId_key" ON "EventGroupMapper"("eventGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "EventGroupMapper_slaveId_masterId_key" ON "EventGroupMapper"("slaveId", "masterId");

-- AddForeignKey
ALTER TABLE "EventGroupMapper" ADD CONSTRAINT "EventGroupMapper_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
