/*
  Warnings:

  - Added the required column `duration` to the `Songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Songs" ADD COLUMN     "duration" INTEGER NOT NULL;
