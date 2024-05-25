/*
  Warnings:

  - Made the column `schedule` on table `Action` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "schedule" SET NOT NULL,
ALTER COLUMN "schedule" SET DEFAULT CURRENT_TIMESTAMP;
