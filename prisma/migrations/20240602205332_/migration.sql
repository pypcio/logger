/*
  Warnings:

  - You are about to drop the column `topic` on the `Action` table. All the data in the column will be lost.
  - Made the column `topic` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "topic";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "topic" SET NOT NULL;
