/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_eventId_fkey";

-- DropIndex
DROP INDEX "Event_deviceId_idx";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("deviceId", "id");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_eventId_deviceId_fkey" FOREIGN KEY ("eventId", "deviceId") REFERENCES "Event"("id", "deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;
