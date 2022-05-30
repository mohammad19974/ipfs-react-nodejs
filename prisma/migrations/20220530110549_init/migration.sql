-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
