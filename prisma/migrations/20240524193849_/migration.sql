-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "Inverter_deviceId_fkey" TO "Inverter_id_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "Logger_deviceId_fkey" TO "Logger_id_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "Meter_deviceId_fkey" TO "Meter_id_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "Plant_deviceId_fkey" TO "Plant_id_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "SecurityDevice_deviceId_fkey" TO "SecurityDevice_id_fkey";
