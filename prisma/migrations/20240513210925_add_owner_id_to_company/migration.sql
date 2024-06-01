/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "owner_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_owner_id_key" ON "Company"("owner_id");
