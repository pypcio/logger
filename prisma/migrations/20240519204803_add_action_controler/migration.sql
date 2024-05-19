-- CreateEnum
CREATE TYPE "ActionStatus" AS ENUM ('SCHEDULED', 'EXECUTED', 'CANCELED', 'EXPIRED', 'ERROR');

-- CreateTable
CREATE TABLE "ActionHistory" (
    "id" SERIAL NOT NULL,
    "actionId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "ActionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionControl" (
    "id" SERIAL NOT NULL,
    "plantId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "ActionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActionHistory_actionId_plantId_idx" ON "ActionHistory"("actionId", "plantId");

-- CreateIndex
CREATE INDEX "ActionControl_plantId_idx" ON "ActionControl"("plantId");

-- CreateIndex
CREATE INDEX "ActionControl_actionId_idx" ON "ActionControl"("actionId");

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionControl" ADD CONSTRAINT "ActionControl_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionControl" ADD CONSTRAINT "ActionControl_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
