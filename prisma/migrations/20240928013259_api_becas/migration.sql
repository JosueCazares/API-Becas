/*
  Warnings:

  - You are about to drop the `example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `example`;

-- CreateTable
CREATE TABLE `CatalagoBeca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameBeca` VARCHAR(191) NOT NULL,
    `descripcionBeca` VARCHAR(191) NOT NULL,
    `estatus` ENUM('Activa', 'Inactiva') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
