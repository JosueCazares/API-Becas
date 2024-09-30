/*
  Warnings:

  - You are about to drop the column `descripcionBeca` on the `catalagobeca` table. All the data in the column will be lost.
  - You are about to drop the column `nameBeca` on the `catalagobeca` table. All the data in the column will be lost.
  - Added the required column `descripcin` to the `CatalagoBeca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `CatalagoBeca` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `catalagobeca` DROP COLUMN `descripcionBeca`,
    DROP COLUMN `nameBeca`,
    ADD COLUMN `descripcin` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `example` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
