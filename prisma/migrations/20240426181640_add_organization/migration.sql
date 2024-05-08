/*
  Warnings:

  - You are about to drop the `OrganizationUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_organizationId_fkey";

-- DropTable
DROP TABLE "OrganizationUser";

-- CreateTable
CREATE TABLE "SecurityDevice" (
    "id" TEXT NOT NULL,
    "plant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "producent" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityDeviceLog" (
    "id" SERIAL NOT NULL,
    "inverter_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "frequency" DOUBLE PRECISION,
    "voltage_l1" DOUBLE PRECISION,
    "current_l2" DOUBLE PRECISION,
    "a_power_l1" DOUBLE PRECISION,
    "r_power_l1" DOUBLE PRECISION,

    CONSTRAINT "SecurityDeviceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMembership" (
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "OrganizationMembership_pkey" PRIMARY KEY ("userId","organizationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- AddForeignKey
ALTER TABLE "SecurityDevice" ADD CONSTRAINT "SecurityDevice_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityDeviceLog" ADD CONSTRAINT "SecurityDeviceLog_inverter_id_fkey" FOREIGN KEY ("inverter_id") REFERENCES "SecurityDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
