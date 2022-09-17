import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadingService } from "./reading.service";

export class ReadingController {

    async addReading(req: Request, res: Response) {
        const {titulo, subtitulo, tags} = req.body
        const {id} = req.user
        const userId = id
        

        const readingService = container.resolve(ReadingService)
        const newReading = readingService.addReading({titulo, subtitulo, tags, userId})
        return res.status(200).json({newReading})
    }
}