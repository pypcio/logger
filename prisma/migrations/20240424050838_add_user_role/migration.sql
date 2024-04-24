-- CreateEnum
CREATE TYPE "UserRote" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRote" NOT NULL DEFAULT 'USER';
