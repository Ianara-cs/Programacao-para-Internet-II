import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadingService } from "./reading.service";

export class ReadingController {

    async addReading(req: Request, res: Response) {
        const {titulo, subtitulo, tags} = req.body
        const {userId: id} = req.user
        
        const readingService = container.resolve(ReadingService)
        const newReading = await readingService.addReading(id, {titulo, subtitulo, tags})
        
        return res.status(200).json({newReading})
    }

    async listAllReading (req: Request, res: Response) {
        const readingService = container.resolve(ReadingService)
        const readings = await readingService.listAllReading()

        return res.status(200).json(readings)
    }

    async removeReading (req: Request, res: Response) {
        const {id: readingId} = req.params
        const {userId} = req.user
        console.log(readingId)

        const readingService = container.resolve(ReadingService)
        const readings = await readingService.removeReading(userId, readingId)

        res.status(200).json({messege: "deletado com sucesso!"})

    }
}