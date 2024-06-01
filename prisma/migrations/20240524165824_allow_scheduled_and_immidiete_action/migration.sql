/*
  Warnings:

  - Added the required column `userId` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "schedule" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActionHistory" ADD COLUMN     "userId" TEXT NOT NULL;
