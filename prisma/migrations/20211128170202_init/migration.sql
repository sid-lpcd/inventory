/*
  Warnings:

  - You are about to drop the `_HazardToItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `hazardsId` on the `Hazard` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_HazardToItem_B_index";

-- DropIndex
DROP INDEX "_HazardToItem_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_HazardToItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HazardsOnItems" (
    "itemId" INTEGER NOT NULL,
    "hazardId" INTEGER NOT NULL,

    PRIMARY KEY ("itemId", "hazardId"),
    CONSTRAINT "HazardsOnItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HazardsOnItems_hazardId_fkey" FOREIGN KEY ("hazardId") REFERENCES "Hazard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hazard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hazardName" TEXT NOT NULL
);
INSERT INTO "new_Hazard" ("hazardName", "id") SELECT "hazardName", "id" FROM "Hazard";
DROP TABLE "Hazard";
ALTER TABLE "new_Hazard" RENAME TO "Hazard";
CREATE UNIQUE INDEX "Hazard_hazardName_key" ON "Hazard"("hazardName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
