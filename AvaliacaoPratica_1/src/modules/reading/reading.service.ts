import { inject, injectable } from "tsyringe";
import { ICreateReadingDTO } from "./dtos/createReadingDTO";
import { IReadingRepository } from "./repositories/IReadingRepository";

@injectable()
export class ReadingService {
    constructor(
        @inject("ReadingRepository")
        private readingRepository: IReadingRepository
    ) {}

    async addReading ({titulo, subtitulo, tags, userId}: ICreateReadingDTO) {
        const reading = await this.readingRepository.createReading({titulo, subtitulo, userId, tags})

        return reading
    }
}