/*
  Warnings:

  - You are about to drop the column `location` on the `Plant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plant_id]` on the table `Logger` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "location";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "street_address" VARCHAR(255),
    "postal_code" VARCHAR(255),
    "city" VARCHAR(255),
    "district" VARCHAR(255),
    "county" VARCHAR(255),
    "state_province" VARCHAR(255),
    "country" TEXT,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_plantId_key" ON "Location"("plantId");

-- CreateIndex
CREATE UNIQUE INDEX "Logger_plant_id_key" ON "Logger"("plant_id");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
