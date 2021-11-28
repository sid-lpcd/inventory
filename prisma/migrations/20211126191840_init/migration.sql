/*
  Warnings:

  - You are about to drop the column `hazardsId` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hazard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hazardName" TEXT NOT NULL,
    "hazardsId" INTEGER,
    CONSTRAINT "Hazard_hazardsId_fkey" FOREIGN KEY ("hazardsId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Hazard" ("hazardName", "id") SELECT "hazardName", "id" FROM "Hazard";
DROP TABLE "Hazard";
ALTER TABLE "new_Hazard" RENAME TO "Hazard";
CREATE UNIQUE INDEX "Hazard_hazardName_key" ON "Hazard"("hazardName");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Item" ("createdAt", "id", "name", "quantity", "unit", "updatedAt", "volume") SELECT "createdAt", "id", "name", "quantity", "unit", "updatedAt", "volume" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
