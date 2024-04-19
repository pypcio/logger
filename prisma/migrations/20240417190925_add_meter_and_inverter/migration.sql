/*
  Warnings:

  - You are about to drop the `LoggerLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoggerLogs" DROP CONSTRAINT "LoggerLogs_logger_id_fkey";

-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "model" TEXT,
ADD COLUMN     "producent" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "LoggerLogs";

-- CreateTable
CREATE TABLE "LoggerLog" (
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

    CONSTRAINT "LoggerLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meter" (
    "id" TEXT NOT NULL,
    "model" TEXT,
    "producent" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeterLog" (
    "id" SERIAL NOT NULL,
    "meter_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "voltage_l1" DOUBLE PRECISION,
    "voltage_l2" DOUBLE PRECISION,
    "voltage_l3" DOUBLE PRECISION,
    "current_l1" DOUBLE PRECISION,
    "current_l2" DOUBLE PRECISION,
    "current_l3" DOUBLE PRECISION,
    "a_power_l1" DOUBLE PRECISION,
    "a_power_l2" DOUBLE PRECISION,
    "a_power_l3" DOUBLE PRECISION,
    "r_power_l1" DOUBLE PRECISION,
    "r_power_l2" DOUBLE PRECISION,
    "r_power_l3" DOUBLE PRECISION,

    CONSTRAINT "MeterLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inverter" (
    "id" TEXT NOT NULL,
    "model" TEXT,
    "producent" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inverter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InverterLog" (
    "id" SERIAL NOT NULL,
    "inverter_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "frequency" DOUBLE PRECISION,
    "voltage_l1" DOUBLE PRECISION,
    "current_l2" DOUBLE PRECISION,
    "a_power_l1" DOUBLE PRECISION,
    "r_power_l1" DOUBLE PRECISION,

    CONSTRAINT "InverterLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoggerLog" ADD CONSTRAINT "LoggerLog_logger_id_fkey" FOREIGN KEY ("logger_id") REFERENCES "Logger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeterLog" ADD CONSTRAINT "MeterLog_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "Meter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InverterLog" ADD CONSTRAINT "InverterLog_inverter_id_fkey" FOREIGN KEY ("inverter_id") REFERENCES "Inverter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
