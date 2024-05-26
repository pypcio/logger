/*
  Warnings:

  - You are about to drop the column `name` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ActionHistory` table. All the data in the column will be lost.
  - Added the required column `device` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "name",
ADD COLUMN     "device" TEXT;

-- AlterTable
ALTER TABLE "ActionHistory" DROP COLUMN "name",
ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
