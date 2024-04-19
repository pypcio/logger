/*
  Warnings:

  - Added the required column `description` to the `Logger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "description" TEXT NOT NULL;
