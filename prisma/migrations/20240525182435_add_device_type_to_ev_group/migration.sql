-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('PLANT', 'LOGGER', 'SECURITY_DEVICE', 'METER', 'INVERTER');

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
ALTER TABLE "EventGroup" ADD COLUMN     "deviceType" "DeviceType";

-- AlterTable
ALTER TABLE "Inverter" ALTER COLUMN "eventGroupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Logger" ALTER COLUMN "eventGroupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Meter" ALTER COLUMN "eventGroupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "eventGroupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SecurityDevice" ALTER COLUMN "eventGroupId" DROP NOT NULL;

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
