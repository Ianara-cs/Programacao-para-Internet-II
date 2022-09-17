import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadingService } from "./reading.service";

export class ReadingController {

    async addReading(req: Request, res: Response) {
        const {titulo, subtitulo, tags} = req.body
        const {id} = req.user
        

        const readingService = container.resolve(ReadingService)
        const newReading = await readingService.addReading(id, {titulo, subtitulo, tags})
        return res.status(200).json({newReading})
    }
}