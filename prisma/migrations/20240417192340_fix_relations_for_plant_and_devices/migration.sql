/*
  Warnings:

  - You are about to drop the column `plantId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plant_id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plant_id` to the `Inverter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plant_id` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plant_id` to the `Meter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_plantId_fkey";

-- DropIndex
DROP INDEX "Location_plantId_key";

-- AlterTable
ALTER TABLE "Inverter" ADD COLUMN     "plant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "plantId",
ADD COLUMN     "plant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meter" ADD COLUMN     "plant_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_plant_id_key" ON "Location"("plant_id");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meter" ADD CONSTRAINT "Meter_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
