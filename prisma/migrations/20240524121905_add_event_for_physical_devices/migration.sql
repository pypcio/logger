/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `action` on the `ActionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `actionControlId` on the `ActionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `plantId` on the `ActionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ActionHistory` table. All the data in the column will be lost.
  - You are about to drop the `ActionControl` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueType` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueType` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('FLOAT', 'INTEGER', 'BOOLEAN', 'STRING');

-- DropForeignKey
ALTER TABLE "ActionControl" DROP CONSTRAINT "ActionControl_actionId_fkey";

-- DropForeignKey
ALTER TABLE "ActionControl" DROP CONSTRAINT "ActionControl_plantId_fkey";

-- DropForeignKey
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_actionControlId_fkey";

-- DropForeignKey
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_actionId_fkey";

-- DropForeignKey
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_plantId_fkey";

-- DropIndex
DROP INDEX "ActionHistory_actionControlId_idx";

-- DropIndex
DROP INDEX "ActionHistory_plantId_idx";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
DROP COLUMN "name",
ADD COLUMN     "boolValue" BOOLEAN,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "floatValue" DOUBLE PRECISION,
ADD COLUMN     "intValue" INTEGER,
ADD COLUMN     "schedule" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ActionStatus" NOT NULL DEFAULT 'SCHEDULED',
ADD COLUMN     "stringValue" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "valueType" "ValueType" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "unit" DROP NOT NULL,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Action_id_seq";

-- AlterTable
ALTER TABLE "ActionHistory" DROP COLUMN "action",
DROP COLUMN "actionControlId",
DROP COLUMN "plantId",
DROP COLUMN "value",
ADD COLUMN     "boolValue" BOOLEAN,
ADD COLUMN     "floatValue" DOUBLE PRECISION,
ADD COLUMN     "intValue" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "stringValue" TEXT,
ADD COLUMN     "unit" TEXT,
ADD COLUMN     "valueType" "ValueType" NOT NULL,
ALTER COLUMN "actionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Inverter" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "Meter" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "eventGroupId" TEXT;

-- AlterTable
ALTER TABLE "SecurityDevice" ADD COLUMN     "eventGroupId" TEXT;

-- DropTable
DROP TABLE "ActionControl";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eventGroupId" TEXT NOT NULL,
    "valueType" "ValueType" NOT NULL,
    "rangeStart" DOUBLE PRECISION,
    "rangeEnd" DOUBLE PRECISION,
    "step" DOUBLE PRECISION,
    "predefinedValues" TEXT[],
    "unit" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_eventGroupId_key" ON "Event"("name", "eventGroupId");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meter" ADD CONSTRAINT "Meter_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityDevice" ADD CONSTRAINT "SecurityDevice_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
