-- CreateTable
CREATE TABLE "_HazardToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Hazard" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_HazardToItem_AB_unique" ON "_HazardToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_HazardToItem_B_index" ON "_HazardToItem"("B");