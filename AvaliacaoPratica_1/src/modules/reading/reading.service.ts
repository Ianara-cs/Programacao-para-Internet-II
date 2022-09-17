import { container, inject, injectable } from "tsyringe";
import { IUsersRepository } from "../auth/repositories/IUsersRepository";
import { TagsService } from "../tags/tags.service";
import { ICreateReadingDTO } from "./dtos/createReadingDTO";
import { IReadingRepository } from "./repositories/IReadingRepository";

@injectable()
export class ReadingService {
    constructor(
        @inject("ReadingRepository")
        private readingRepository: IReadingRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    async addReading (userId: string, {titulo, subtitulo, tags}: ICreateReadingDTO) {
        const user = await this.usersRepository.findById(userId)
        const tagsService = container.resolve(TagsService)

        const tagsValidation = await tagsService.getTag(tags)

        const reading = await this.readingRepository.createReading(user ,{titulo, subtitulo, tags: tagsValidation})

        return reading
    }

    async listAllReading () {
        return await this.readingRepository.findAllReading()
    }

    async removeReading (userId: string, readingId: string) {
        const reading = await this.readingRepository.findById(readingId)
        const user = await this.usersRepository.findById(userId)

        if(!reading) {
            throw new Error('Reading not found!')
        } 
        
        if(reading.user.id !== user.id) {
            throw new Error('Operação impossível')
        } 

        return await this.readingRepository.removeReading(reading.id)
    }
}