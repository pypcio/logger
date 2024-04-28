/*
  Warnings:

  - You are about to drop the column `plant_id` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_plant_id_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_locationId_fkey";

-- DropIndex
DROP INDEX "Location_plant_id_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "plant_id";

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "locationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Plant_locationId_key" ON "Plant"("locationId");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
