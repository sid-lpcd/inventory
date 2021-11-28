-- CreateTable
CREATE TABLE "Hazard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameid" INTEGER,
    "hazard_name" TEXT NOT NULL,
    CONSTRAINT "Hazard_nameid_fkey" FOREIGN KEY ("nameid") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hazard_nameid_key" ON "Hazard"("nameid");
