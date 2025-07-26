-- AlterTable
ALTER TABLE "Songs" ADD COLUMN     "currentPosition" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isPlaying" BOOLEAN NOT NULL DEFAULT false;
