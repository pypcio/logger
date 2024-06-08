/*
  Warnings:

  - You are about to drop the column `topic` on the `EventGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "topic" "EventTopic";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "topic" "EventTopic";

-- AlterTable
ALTER TABLE "EventGroup" DROP COLUMN "topic";
