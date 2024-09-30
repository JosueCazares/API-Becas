import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { SolicitudBeca } from '@prisma/client';
import { ZodSolicitudesBecaObj } from '@/validation/ZodSolicitudesBeca'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let examples = await prisma.solicitudBeca.findMany();

    let responseOk: APIResponse<SolicitudBeca[]> = {
        status: 'success',
        data: examples
    }

    return res.status(200).json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodSolicitudesBecaObj.parse(req.body);
        let nuevaBeca = await prisma.solicitudBeca.create({
            data: camposValidados
        });
        let responseOk: APIResponse<SolicitudBeca> = {
            status: 'success',
            data: nuevaBeca
        }
        return res.status(200).json(responseOk);
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod: APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos inválidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod);
        }
        return res.status(500).json(responseError);
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodSolicitudesBecaObj.parse(req.body);

        let solicitudBecaBusqueda = await prisma.solicitudBeca.findUnique({
            where: {
                id: camposValidados.id,
            },
        });

        // Si no se encuentra la solicitud, devolver un error 404
        if (!solicitudBecaBusqueda) {
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "No se encontró una solicitud de beca que coincida con el ID proporcionado"
            };
            return res.status(404).json(responseError);
        }

        // Actualizar la solicitud de beca usando el ID
        let solicitudBecaActualizada = await prisma.solicitudBeca.update({
            where: { id: camposValidados.id },
            data: {
                idAlumno: camposValidados.idAlumno,
                idBeca: camposValidados.idBeca,
                estatus: camposValidados.estatus,
                comentarios: camposValidados.comentarios
            }
        });

        // Responder con la solicitud de beca actualizada
        let responseOk: APIResponse<SolicitudBeca> = {
            status: 'success',
            data: solicitudBecaActualizada
        };
        return res.status(200).json(responseOk);
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        };
        if (error instanceof z.ZodError) {
            let responseErrorZod: APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos inválidos",
                data: error.errors
            };
            return res.status(400).json(responseErrorZod);
        }
        return res.status(500).json(responseError);
    }
});
