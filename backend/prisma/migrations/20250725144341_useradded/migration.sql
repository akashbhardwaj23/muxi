-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passsword" TEXT NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Songs" (
    "id" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "songurl" TEXT NOT NULL,
    "songImg" TEXT NOT NULL,
    "songDescription" TEXT NOT NULL,

    CONSTRAINT "Songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
