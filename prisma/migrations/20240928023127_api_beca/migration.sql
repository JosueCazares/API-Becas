/*
  Warnings:

  - You are about to drop the column `descripcin` on the `catalagobeca` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `CatalagoBeca` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `catalagobeca` DROP COLUMN `descripcin`,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL;
