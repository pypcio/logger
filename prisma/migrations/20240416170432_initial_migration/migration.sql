-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plaint_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_plaint_id_fkey" FOREIGN KEY ("plaint_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
