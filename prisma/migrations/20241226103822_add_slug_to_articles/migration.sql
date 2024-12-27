/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN "slug" TEXT;

-- Update existing rows with a placeholder slug value
UPDATE "Article" SET "slug" = 'placeholder-slug-' || "id";

-- Add a unique constraint to the slug column
ALTER TABLE "Article" ADD CONSTRAINT "Article_slug_key" UNIQUE ("slug");