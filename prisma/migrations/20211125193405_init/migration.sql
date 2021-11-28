-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hazard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hazard_name" TEXT
);
INSERT INTO "new_Hazard" ("hazard_name", "id") SELECT "hazard_name", "id" FROM "Hazard";
DROP TABLE "Hazard";
ALTER TABLE "new_Hazard" RENAME TO "Hazard";
CREATE UNIQUE INDEX "Hazard_hazard_name_key" ON "Hazard"("hazard_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
