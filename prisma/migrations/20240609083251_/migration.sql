/*
  Warnings:

  - You are about to drop the column `userId` on the `Action` table. All the data in the column will be lost.
  - Added the required column `email` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Action_userId_idx";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;
