/*
  Warnings:

  - Made the column `name` on table `Action` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "name" SET NOT NULL;
