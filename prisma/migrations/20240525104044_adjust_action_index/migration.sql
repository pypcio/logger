/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Action` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `eventGroupId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actEvtGrpId` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `actionId` on the `ActionHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ActionHistory" DROP CONSTRAINT "ActionHistory_actionId_fkey";

-- DropIndex
DROP INDEX "ActionHistory_actionId_idx";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
ADD COLUMN     "eventGroupId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("eventGroupId", "id");

-- AlterTable
ALTER TABLE "ActionHistory" ADD COLUMN     "actEvtGrpId" TEXT NOT NULL,
DROP COLUMN "actionId",
ADD COLUMN     "actionId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "ActionHistory_actionId_actEvtGrpId_idx" ON "ActionHistory"("actionId", "actEvtGrpId");

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_actionId_actEvtGrpId_fkey" FOREIGN KEY ("actionId", "actEvtGrpId") REFERENCES "Action"("id", "eventGroupId") ON DELETE RESTRICT ON UPDATE CASCADE;
