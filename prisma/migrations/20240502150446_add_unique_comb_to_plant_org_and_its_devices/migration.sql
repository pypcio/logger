/*
  Warnings:

  - A unique constraint covering the columns `[name,plant_id]` on the table `Inverter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,plant_id]` on the table `Logger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,plant_id]` on the table `Meter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,organizationId]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,plant_id]` on the table `SecurityDevice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Plant_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Inverter_name_plant_id_key" ON "Inverter"("name", "plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Logger_name_plant_id_key" ON "Logger"("name", "plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Meter_name_plant_id_key" ON "Meter"("name", "plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_organizationId_key" ON "Plant"("name", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityDevice_name_plant_id_key" ON "SecurityDevice"("name", "plant_id");
