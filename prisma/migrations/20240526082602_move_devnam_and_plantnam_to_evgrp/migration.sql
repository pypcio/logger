/*
  Warnings:

  - You are about to drop the column `device` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `plant` on the `Action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "device",
DROP COLUMN "plant";

-- AlterTable
ALTER TABLE "EventGroup" ADD COLUMN     "deviceName" TEXT,
ADD COLUMN     "plantName" TEXT;
