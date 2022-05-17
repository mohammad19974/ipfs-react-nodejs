/*
  Warnings:

  - Added the required column `fileName` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "name" TEXT,
    "fileName" TEXT NOT NULL
);
INSERT INTO "new_files" ("hash", "id", "name") SELECT "hash", "id", "name" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
CREATE UNIQUE INDEX "files_hash_key" ON "files"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
