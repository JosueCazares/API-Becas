-- CreateTable
CREATE TABLE `SolicitudBeca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAlumno` INTEGER NOT NULL,
    `idBeca` INTEGER NOT NULL,
    `estatus` ENUM('Aceptado', 'Rechazado') NOT NULL,
    `comentarios` VARCHAR(191) NOT NULL,

    INDEX `SolicitudBeca_idBeca_idx`(`idBeca`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SolicitudBeca` ADD CONSTRAINT `SolicitudBeca_idBeca_fkey` FOREIGN KEY (`idBeca`) REFERENCES `CatalagoBeca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
