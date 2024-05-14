/*
  Warnings:

  - You are about to drop the `_CompanyUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompanyUsers" DROP CONSTRAINT "_CompanyUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyUsers" DROP CONSTRAINT "_CompanyUsers_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company_id" TEXT;

-- DropTable
DROP TABLE "_CompanyUsers";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
