/*
  Warnings:

  - You are about to drop the column `nameid` on the `Hazard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hazardsId" INTEGER,
    CONSTRAINT "Item_hazardsId_fkey" FOREIGN KEY ("hazardsId") REFERENCES "Hazard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createdAt", "id", "name", "quantity", "unit", "updatedAt", "volume") SELECT "createdAt", "id", "name", "quantity", "unit", "updatedAt", "volume" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_hazardsId_key" ON "Item"("hazardsId");
CREATE TABLE "new_Hazard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hazard_name" TEXT NOT NULL
);
INSERT INTO "new_Hazard" ("hazard_name", "id") SELECT "hazard_name", "id" FROM "Hazard";
DROP TABLE "Hazard";
ALTER TABLE "new_Hazard" RENAME TO "Hazard";
CREATE UNIQUE INDEX "Hazard_hazard_name_key" ON "Hazard"("hazard_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
