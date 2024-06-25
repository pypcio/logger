/*
  Warnings:

  - The primary key for the `DeviceAssigment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[slave_id,master_id]` on the table `DeviceAssigment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DeviceAssigment_device_id_key";

-- AlterTable
ALTER TABLE "DeviceAssigment" DROP CONSTRAINT "DeviceAssigment_pkey",
ADD CONSTRAINT "DeviceAssigment_pkey" PRIMARY KEY ("device_id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAssigment_slave_id_master_id_key" ON "DeviceAssigment"("slave_id", "master_id");
