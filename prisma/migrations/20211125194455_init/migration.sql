/*
  Warnings:

  - Made the column `hazardName` on table `Hazard` required. This step will fail if there are existing NULL values in that column.

*/
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
