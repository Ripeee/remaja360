/*
  Warnings:

  - Added the required column `grade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;