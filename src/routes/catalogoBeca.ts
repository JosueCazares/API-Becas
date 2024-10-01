import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { CatalagoBeca } from '@prisma/client';
import {ZodCatalagoBecasObj} from '@/validation/ZodCatalogoBecas'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let examples = await prisma.catalagoBeca.findMany();

    let responseOk: APIResponse<CatalagoBeca[]> = {
        status: 'success',
        data: examples
    }

    return res.status(200).json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodCatalagoBecasObj.parse(req.body)
        let beca = await prisma.catalagoBeca.create({
            data: camposValidados
        });
        let responseOk: APIResponse<CatalagoBeca> = {
            status: 'success',
            data: beca
        }
        return res.status(200).json(responseOk)
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});


router.put('/', async (req: Request, res: Response) => {
    try {
        // Validar los campos con Zod
        const camposValidados = ZodCatalagoBecasObj.parse(req.body);

        // Buscar la beca por ID, nombre, descripción y estatus
        let becaBusqueda = await prisma.catalagoBeca.findFirst({
            where: {
                id: camposValidados.id,
                nombre: camposValidados.nombre,
                descripcion: camposValidados.descripcion,
                estatus: camposValidados.estatus
            },
        });

        // Si no se encuentra la beca, devolver un error 404
        if (!becaBusqueda) {
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "No se encontró una beca que coincida con el ID, nombre, descripción y estatus proporcionados"
            };
            return res.status(404).json(responseError);
        }

        // Actualizar la beca usando el ID
        let becas = await prisma.catalagoBeca.update({
            where: { id: camposValidados.id },
            data: {
                nombre: camposValidados.nombre,
                descripcion: camposValidados.descripcion,
                estatus: camposValidados.estatus
            }
        });

        // Responder con la beca actualizada
        let responseOk: APIResponse<CatalagoBeca> = {
            status: 'success',
            data: becas
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
