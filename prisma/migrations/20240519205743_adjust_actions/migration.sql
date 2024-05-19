/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Action` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `actionId` on the `ActionControl` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `action` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionControlId` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `actionId` on the `ActionHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ActionControl" DROP CONSTRAINT "ActionControl_actionId_fkey";

-- DropForeignKey
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_actionId_fkey";

-- DropIndex
DROP INDEX "ActionHistory_actionId_plantId_idx";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ActionControl" DROP COLUMN "actionId",
ADD COLUMN     "actionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ActionHistory" ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "actionControlId" INTEGER NOT NULL,
DROP COLUMN "actionId",
ADD COLUMN     "actionId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "ActionControl_actionId_idx" ON "ActionControl"("actionId");

-- CreateIndex
CREATE INDEX "ActionHistory_actionControlId_idx" ON "ActionHistory"("actionControlId");

-- CreateIndex
CREATE INDEX "ActionHistory_plantId_idx" ON "ActionHistory"("plantId");

-- CreateIndex
CREATE INDEX "ActionHistory_actionId_idx" ON "ActionHistory"("actionId");

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_actionControlId_fkey" FOREIGN KEY ("actionControlId") REFERENCES "ActionControl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionControl" ADD CONSTRAINT "ActionControl_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
