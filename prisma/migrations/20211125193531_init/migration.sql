/*
  Warnings:

  - You are about to drop the column `hazard_name` on the `Hazard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hazard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hazardName" TEXT
);
INSERT INTO "new_Hazard" ("id") SELECT "id" FROM "Hazard";
DROP TABLE "Hazard";
ALTER TABLE "new_Hazard" RENAME TO "Hazard";
CREATE UNIQUE INDEX "Hazard_hazardName_key" ON "Hazard"("hazardName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
