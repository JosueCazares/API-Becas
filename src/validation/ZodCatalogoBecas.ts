import { Estatus } from '@prisma/client';
import { z } from 'zod';

export const ZodCatalagoBecasObj = z.object({
  id: z.number().optional(), // Añadimos el ID como campo opcional
  nombre: z.string(),
  descripcion: z.string(),
  estatus: z.nativeEnum(Estatus)
})

