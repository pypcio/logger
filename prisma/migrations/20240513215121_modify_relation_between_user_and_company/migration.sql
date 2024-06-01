/*
  Warnings:

  - You are about to drop the column `company_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "company_id";

-- CreateTable
CREATE TABLE "_CompanyUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyUsers_AB_unique" ON "_CompanyUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyUsers_B_index" ON "_CompanyUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Company_owner_id_key" ON "Company"("owner_id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyUsers" ADD CONSTRAINT "_CompanyUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyUsers" ADD CONSTRAINT "_CompanyUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
