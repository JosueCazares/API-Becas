import { z } from "zod";
export const EstatusSolicitudEnum = z.enum(["Aceptado", "Rechazado"]);


export const ZodSolicitudesBecaObj = z.object({
  id: z.number().int().optional(), // Es opcional porque es autoincremental
  idAlumno: z.number().int(),
  idBeca: z.number().int(),
  estatus: EstatusSolicitudEnum,
  comentarios: z.string().optional(), // Es opcional
});


export type SolicitudBeca = z.infer<typeof ZodSolicitudesBecaObj>;