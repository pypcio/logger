/*
  Warnings:

  - A unique constraint covering the columns `[userId,companyId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,organizationId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Request_userId_companyId_key" ON "Request"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Request_userId_organizationId_key" ON "Request"("userId", "organizationId");
