/*
  Warnings:

  - Added the required column `deviceType` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('LOGGER', 'METER', 'SECURITY');

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "deviceType" "DeviceType" NOT NULL;
