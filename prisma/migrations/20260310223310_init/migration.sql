-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "Participant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_slug_key" ON "Session"("slug");

-- CreateIndex
CREATE INDEX "Session_slug_idx" ON "Session"("slug");

-- CreateIndex
CREATE INDEX "Participant_sessionId_idx" ON "Participant"("sessionId");
