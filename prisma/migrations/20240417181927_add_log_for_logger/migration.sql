-- CreateEnum
CREATE TYPE "SysState" AS ENUM ('WAITING', 'CHECKING', 'ON_GRID', 'EMERGENCY_MODE', 'RECOVERY_FAULT', 'PERMAMENT_FAILURE', 'UPGRADING', 'SELF_CHARGING');

-- CreateTable
CREATE TABLE "LoggerLogs" (
    "id" SERIAL NOT NULL,
    "logger_id" TEXT NOT NULL,
    "sys_state" "SysState",
    "temp_env" DOUBLE PRECISION,
    "temp_heat_sink" DOUBLE PRECISION,
    "temp_inv" DOUBLE PRECISION,
    "insulation_res" DOUBLE PRECISION,
    "pv_generation_today" DOUBLE PRECISION,
    "pv_generation_total" DOUBLE PRECISION,

    CONSTRAINT "LoggerLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoggerLogs" ADD CONSTRAINT "LoggerLogs_logger_id_fkey" FOREIGN KEY ("logger_id") REFERENCES "Logger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
