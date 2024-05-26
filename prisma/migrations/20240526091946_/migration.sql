/*
  Warnings:

  - Made the column `plantName` on table `EventGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventGroup" ALTER COLUMN "plantName" SET NOT NULL;
