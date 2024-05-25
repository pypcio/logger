-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "inverterDevice_fkey" TO "Inverter_deviceId_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "loggerDevice_fkey" TO "Logger_deviceId_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "meterDevice_fkey" TO "Meter_deviceId_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "plantDevice_fkey" TO "Plant_deviceId_fkey";

-- RenameForeignKey
ALTER TABLE "Event" RENAME CONSTRAINT "secDevDevice_fkey" TO "SecurityDevice_deviceId_fkey";
