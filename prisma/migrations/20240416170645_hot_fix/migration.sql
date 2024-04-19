/*
  Warnings:

  - You are about to drop the column `plaint_id` on the `Logger` table. All the data in the column will be lost.
  - Added the required column `plant_id` to the `Logger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Logger" DROP CONSTRAINT "Logger_plaint_id_fkey";

-- AlterTable
ALTER TABLE "Logger" DROP COLUMN "plaint_id",
ADD COLUMN     "plant_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
