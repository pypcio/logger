/*
  Warnings:

  - Made the column `deviceName` on table `EventGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventGroup" ALTER COLUMN "deviceName" SET NOT NULL;
