/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventGroupId` on the `Action` table. All the data in the column will be lost.
  - The primary key for the `ActionHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actEvtGrpId` on the `ActionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ActionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroupId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventGroupMapper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inverter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InverterLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Logger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoggerLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeterLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SecurityDevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SecurityDeviceLog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[topic,deviceId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `devId` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `topic` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventInstruction" AS ENUM ('AMBIENT_TEMPERATURE', 'BATTERY_HEALTH', 'BATTERY_LEVEL', 'CURRENT', 'EFFICIENCY', 'ENERGY_OUTPUT', 'FREQUENCY', 'LOG_INTERVAL', 'MOTION_DETECTED', 'NETWORK_STATUS', 'OUTPUT_POWER', 'PANEL_TEMPERATURE', 'POWER', 'SIGNAL_STRENGTH', 'SOLAR_IRRADIANCE', 'STATUS', 'STORAGE_CAPACITY', 'SWITCH_BREAKER', 'TAMPER_ALERT', 'TEMPERATURE', 'VOLTAGE');

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_userId_fkey";

-- DropForeignKey
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_actionId_actEvtGrpId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "EventGroup_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "EventGroupMapper" DROP CONSTRAINT "EventGroupMapper_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Inverter" DROP CONSTRAINT "Inverter_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Inverter" DROP CONSTRAINT "Inverter_plant_id_fkey";

-- DropForeignKey
ALTER TABLE "InverterLog" DROP CONSTRAINT "InverterLog_inverter_id_fkey";

-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_plant_id_fkey";

-- DropForeignKey
ALTER TABLE "LoggerLog" DROP CONSTRAINT "LoggerLog_logger_id_fkey";

-- DropForeignKey
ALTER TABLE "Meter" DROP CONSTRAINT "Meter_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Meter" DROP CONSTRAINT "Meter_plant_id_fkey";

-- DropForeignKey
ALTER TABLE "MeterLog" DROP CONSTRAINT "MeterLog_meter_id_fkey";

-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "SecurityDevice" DROP CONSTRAINT "SecurityDevice_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "SecurityDevice" DROP CONSTRAINT "SecurityDevice_plant_id_fkey";

-- DropForeignKey
ALTER TABLE "SecurityDeviceLog" DROP CONSTRAINT "SecurityDeviceLog_security_id_fkey";

-- DropIndex
DROP INDEX "ActionHistory_actionId_actEvtGrpId_idx";

-- DropIndex
DROP INDEX "Event_eventGroupId_idx";

-- DropIndex
DROP INDEX "Event_name_eventGroupId_key";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
DROP COLUMN "eventGroupId",
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("deviceId", "id");

-- AlterTable
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_pkey",
DROP COLUMN "actEvtGrpId",
DROP COLUMN "id",
ADD COLUMN     "devId" TEXT NOT NULL,
ADD CONSTRAINT "ActionHistory_pkey" PRIMARY KEY ("actionId", "devId");

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventGroupId",
ADD COLUMN     "deviceId" TEXT NOT NULL,
DROP COLUMN "topic",
ADD COLUMN     "topic" "EventInstruction" NOT NULL;

-- DropTable
DROP TABLE "EventGroup";

-- DropTable
DROP TABLE "EventGroupMapper";

-- DropTable
DROP TABLE "Inverter";

-- DropTable
DROP TABLE "InverterLog";

-- DropTable
DROP TABLE "Logger";

-- DropTable
DROP TABLE "LoggerLog";

-- DropTable
DROP TABLE "Meter";

-- DropTable
DROP TABLE "MeterLog";

-- DropTable
DROP TABLE "SecurityDevice";

-- DropTable
DROP TABLE "SecurityDeviceLog";

-- DropEnum
DROP TYPE "DeviceType";

-- DropEnum
DROP TYPE "EventTopic";

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "plant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "producent" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventGroupId" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceLog" (
    "id" SERIAL NOT NULL,
    "logger_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sys_state" "SysState",
    "temp_env" DOUBLE PRECISION,
    "temp_heat_sink" DOUBLE PRECISION,
    "temp_inv" DOUBLE PRECISION,
    "insulation_res" DOUBLE PRECISION,
    "pv_generation_today" DOUBLE PRECISION,
    "pv_generation_total" DOUBLE PRECISION,

    CONSTRAINT "DeviceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceAssigment" (
    "device_id" TEXT NOT NULL,
    "serial_numb" TEXT NOT NULL,
    "slave_id" INTEGER NOT NULL,
    "master_id" INTEGER NOT NULL,

    CONSTRAINT "DeviceAssigment_pkey" PRIMARY KEY ("slave_id","master_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_eventGroupId_key" ON "Device"("eventGroupId");

-- CreateIndex
CREATE INDEX "Device_plant_id_idx" ON "Device"("plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_plant_id_key" ON "Device"("name", "plant_id");

-- CreateIndex
CREATE INDEX "DeviceLog_logger_id_idx" ON "DeviceLog"("logger_id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAssigment_device_id_key" ON "DeviceAssigment"("device_id");

-- CreateIndex
CREATE INDEX "Event_deviceId_idx" ON "Event"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_topic_deviceId_key" ON "Event"("topic", "deviceId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceLog" ADD CONSTRAINT "DeviceLog_logger_id_fkey" FOREIGN KEY ("logger_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAssigment" ADD CONSTRAINT "DeviceAssigment_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_actionId_devId_fkey" FOREIGN KEY ("actionId", "devId") REFERENCES "Action"("id", "deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
